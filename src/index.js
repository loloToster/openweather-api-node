/**
 * @typedef {"af"|"al"|"ar"|"az"|"bg"|"ca"|"cz"|"da"|"de"|"el"|"en"|"eu"|"fa"|"fi"|"fr"|"gl"|"he"|"hi"|"hr"|"hu"|"id"|"it"|"ja"|"kr"|"la"|"lt"|"mk"|"no"|"nl"|"pl"|"pt"|"pt_br"|"ro"|"ru"|"sv"|"se"|"sk"|"sl"|"sp"|"es"|"sr"|"th"|"tr"|"ua"|"uk"|"vi"|"zh_cn"|"zh_tw"|"zu"} Language
 */

const SUP_LANGS = [
    "af",
    "al",
    "ar",
    "az",
    "bg",
    "ca",
    "cz",
    "da",
    "de",
    "el",
    "en",
    "eu",
    "fa",
    "fi",
    "fr",
    "gl",
    "he",
    "hi",
    "hr",
    "hu",
    "id",
    "it",
    "ja",
    "kr",
    "la",
    "lt",
    "mk",
    "no",
    "nl",
    "pl",
    "pt",
    "pt_br",
    "ro",
    "ru",
    "sv",
    "se",
    "sk",
    "sl",
    "sp",
    "es",
    "sr",
    "th",
    "tr",
    "ua",
    "uk",
    "vi",
    "zh_cn",
    "zh_tw",
    "zu"
]

/**
 * @typedef {"standard"|"metric"|"imperial"} Unit
 */

const SUP_UNITS = ["standard", "metric", "imperial"]

const API_ENDPOINT = "https://api.openweathermap.org/",
    GEO_PATH = "geo/1.0/",
    DATA_PATH = "data/2.5",
    ONECALL_PATH = DATA_PATH + "/onecall",
    AIR_POLLUTION_PATH = DATA_PATH + "/air_pollution"

const axios = require("axios").default

const currentParser = require("./parsers/weather/current-parser"),
    minutelyParser = require("./parsers/weather/minutely-parser"),
    hourlyParser = require("./parsers/weather/hourly-parser"),
    dailyParser = require("./parsers/weather/daily-parser")

const singleAirPollutionParser = require("./parsers/air-pollution/single-parser"),
    listAirPollutionParser = require("./parsers/air-pollution/list-parser")

function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item)
}

// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeObj(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeObj(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return mergeObj(target, ...sources)
}

/**
 * @typedef {Object} Coordinates
 * @property {Number} [lat]
 * @property {Number} [lon]
 */

/**
 * @typedef {Object} Options
 * @property {String} [key]
 * @property {Language} [lang]
 * @property {String} [units]
 * @property {Coordinates} [coordinates]
 * @property {Unit} [units]
 * @property {String} [locationName]
 * @property {String} [zipCode]
 */

/**
 * @typedef {Object} Location 
 * @property {String} name Name of the found location 
 * @property {Object} local_names 
 * * local_names.[language code] - Name of the found location in different languages. The list of names can be different for different locations
 * * local_names.ascii - Internal field
 * * local_names.feature_name - Internal field
 * @property {Number} lat Geographical coordinates of the found location (latitude)
 * @property {Number} lon Geographical coordinates of the found location (longitude)
 * @property {String} country Country of the found location
 * @property {String|undefined} state State of the found location (where available) 
 */

/**
 * @typedef {Object} Alert
 * @property {String} sender_name Name of the alert source. Please read here the full list of alert sources: https://openweathermap.org/api/one-call-api#listsource
 * @property {String} event Alert event name
 * @property {Number} start Date and time of the start of the alert, Unix, UTC 
 * @property {Number} end Date and time of the end of the alert, Unix, UTC 
 * @property {String} description Description of the alert
 * @property {String[]} tags Type of severe weather
 */

/**
 * @typedef {import("./parsers/weather/current-parser").CurrentWeather} CurrentWeather
 * @typedef {import("./parsers/weather/minutely-parser").MinutelyWeather} MinutelyWeather
 * @typedef {import("./parsers/weather/hourly-parser").HourlyWeather} HourlyWeather
 * @typedef {import("./parsers/weather/daily-parser").DailyWeather} DailyWeather
 */

/**
 * @typedef {Partial<import("./models/weather-model").Astronomical>} Astronomical
 * @typedef {Partial<import("./models/weather-model").Temperatures>} Temperatures
 * @typedef {Partial<import("./models/weather-model").FeelsLike>} FeelsLike
 * @typedef {Partial<import("./models/weather-model").WindData>} WindData
 * @typedef {Partial<import("./models/weather-model").Icon>} Icon
 */

/**
 * @typedef {Object} Conditions
 * @property {Temperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {FeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} [pressure] Atmospheric pressure on the sea level, hPa
 * @property {Number} [humidity] Humidity, %
 * @property {Number} [dew_point] Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} [clouds] Cloudiness, %
 * @property {Number} [uvi] The maximum value of UV index for the day
 * @property {Number} [visibility] Average visibility, metres
 * @property {WindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} [pop] Probability of precipitation
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} [snow] Snow volume, mm
 * @property {Number} [condition_id] Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} [main] Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} [description] Description of the weather
 * @property {Icon} icon
 */

class OpenWeatherAPI {

    /**@typedef {Options} */
    #globalOptions = {
        key: undefined,
        lang: undefined,
        units: undefined,
        coordinates: {
            lat: undefined,
            lon: undefined
        },
        locationName: undefined,
        zipCode: undefined
    }

    /**
     * Constructor of the class. You can specify global options here
     * 
     * @constructor
     * @param {Options} [globalOptions={}] - object that defines global options
     * @returns OpenWeatherAPI object
     */
    constructor(globalOptions = {}) {
        if (
            !(typeof globalOptions === "object") ||
            Array.isArray(globalOptions) ||
            globalOptions === null
        ) throw new Error("Provide {} object as options")
        for (const key in globalOptions) {
            if (Object.hasOwnProperty.call(globalOptions, key)) {
                const value = globalOptions[key]
                switch (key) {
                    case "key":
                        this.setKey(value)
                        break

                    case "language":
                        this.setLanguage(value)
                        break

                    case "units":
                        this.setUnits(value)
                        break

                    case "locationName":
                        this.setLocationByName(value)
                        break

                    case "coordinates":
                        this.setLocationByCoordinates(value.lat, value.lon)
                        break

                    case "zipCode":
                        this.setLocationByZipCode(value)
                        break

                    default:
                        throw new Error("Unknown parameter: " + key)
                }
            }
        }
    }

    // setters and getters

    /**
     * Getter for global options
     * 
     * @returns {Options} global options
     */
    getGlobalOptions() {
        return this.#globalOptions
    }

    /**
     * Sets global API key
     * 
     * @param {String} key 
     */
    setKey(key) {
        if (!key) throw new Error("Empty value cannot be a key: " + key)
        this.#globalOptions.key = key
    }

    /**
     * Getter for global key
     * 
     * @returns {String|undefined} global API key
     */
    getKey() {
        return this.#globalOptions.key
    }

    /**
     * Sets global language (Language must be listed [here](https://openweathermap.org/current#multi))
     * 
     * @param {Language} lang - language
     */
    setLanguage(lang) {
        this.#globalOptions.lang = this.#evaluateLanguage(lang)
    }

    /**
     * Getter for global language
     * 
     * @returns {Language|undefined} global language
     */
    getLanguage() {
        return this.#globalOptions.lang
    }

    #evaluateLanguage(lang) {
        lang = lang.toLowerCase()
        if (SUP_LANGS.includes(lang))
            return lang
        else
            throw new Error("Unsupported language: " + lang)
    }

    /**
     * Sets global units
     * 
     * @param {Unit} units - units (Only **standard**, **metric** or **imperial** are supported)
     */
    setUnits(units) {
        this.#globalOptions.units = this.#evaluateUnits(units)
    }

    /**
     * Getter for global units
     * 
     * @returns {Unit|undefined} global units
     */
    getUnits() {
        return this.#globalOptions.units
    }

    #evaluateUnits(units) {
        units = units.toLowerCase()
        if (SUP_UNITS.includes(units))
            return units
        else
            throw new Error("Unsupported units: " + units)
    }

    /**
     * Sets global location by provided name
     * 
     * @param {String} name - name of the location (`q` parameter [here](https://openweathermap.org/api/geocoding-api#direct_name))
     */
    setLocationByName(name) {
        if (!name) throw new Error("Empty value cannot be a location name: " + name)
        this.#globalOptions.coordinates.lat = undefined
        this.#globalOptions.coordinates.lon = undefined
        this.#globalOptions.zipCode = undefined
        this.#globalOptions.locationName = name
    }

    async #evaluateLocationByName(name, key) {
        let response = await this.#fetch(`${API_ENDPOINT}${GEO_PATH}direct?q=${name}&limit=1&appid=${key}`)
        let data = response.data
        if (data.length == 0) throw new Error("Unknown location name: " + name)
        data = response.data[0]
        return {
            lat: data.lat,
            lon: data.lon
        }
    }

    /**
     * Sets global location by provided coordinates
     * 
     * @param {Number} lat - latitude of the location
     * @param {Number} lon - longitude of the location
     */
    setLocationByCoordinates(lat, lon) {
        let location = this.#evaluateLocationByCoordinates(lat, lon)
        this.#globalOptions.locationName = undefined
        this.#globalOptions.zipCode = undefined
        this.#globalOptions.coordinates.lat = location.lat
        this.#globalOptions.coordinates.lon = location.lon
    }

    #evaluateLocationByCoordinates(lat, lon) {
        if (typeof lat === "number" && typeof lon === "number" && -90 <= lat && lat <= 90 && -180 <= lon && lon <= 180) {
            return { lat: lat, lon: lon }
        } else {
            throw new Error("Wrong coordinates")
        }
    }

    /**
     * Sets global location by provided zip/post code
     * 
     * @param {String} zipCode - zip/post code and country code divided by comma (`zip` parameter [here](https://openweathermap.org/api/geocoding-api#direct_zip))
     */
    setLocationByZipCode(zipCode) {
        if (!zipCode) throw new Error("Empty value cannot be a location zip code: " + zipCode)
        this.#globalOptions.coordinates.lat = undefined
        this.#globalOptions.coordinates.lon = undefined
        this.#globalOptions.locationName = undefined
        this.#globalOptions.zipCode = zipCode
    }

    async #evaluateLocationByZipCode(zipCode, key) {
        let response = await this.#fetch(`${API_ENDPOINT}${GEO_PATH}zip?zip=${zipCode}&appid=${key}`)
        let data = response.data
        return {
            lat: data.lat,
            lon: data.lon
        }
    }

    /**
     * Getter for location
     * 
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Location|null>} location
     */
    async getLocation(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(`${API_ENDPOINT}${GEO_PATH}reverse?lat=${options.coordinates.lat}&lon=${options.coordinates.lon}&limit=1&appid=${options.key}`)
        let data = response.data
        return data.length ? data[0] : null
    }

    /**
     * Getter for locations from query
     * 
     * @param {String} query - query used to search the locations (`q` parameter [here](https://openweathermap.org/api/geocoding-api#direct_name))
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Location[]>} all found locations
     */
    async getAllLocations(query, options = {}) {
        if (!query) throw new Error("No query")
        options = await this.#parseOptions(options)
        let response = await this.#fetch(`${API_ENDPOINT}${GEO_PATH}direct?q=${query}&limit=5&appid=${options.key}`)
        let data = response.data
        return data
    }

    // Weather getters

    /**
     * Getter for current weather
     * 
     * @param {Options} options - options used only for this call
     * @returns weather object of current weather
     */
    async getCurrent(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH, { exclude: "alerts,minutely,hourly,daily" }
            )
        )

        let data = response.data
        return currentParser(data)
    }

    /**
     * Getter for minutely weather
     * 
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next minute (Empty if API returned no info about minutely weather)
     */
    async getMinutelyForecast(limit = Number.POSITIVE_INFINITY, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH, { exclude: "alerts,current,hourly,daily" }
            )
        )

        let data = response.data
        return minutelyParser(data, limit)
    }

    /**
     * Getter for hourly weather
     * 
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next hour (Empty if API returned no info about hourly weather)
     */
    async getHourlyForecast(limit = Number.POSITIVE_INFINITY, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH, { exclude: "alerts,current,minutely,daily" }
            )
        )

        let data = response.data
        return hourlyParser(data, limit)
    }

    /**
     * 
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Boolean} [includeToday=false] - boolean indicating whether to include today's weather in returned array
     * @param {Options} [options={}] - options used only for this call 
     * @returns array of Weather objects, one for every next day (Empty if API returned no info about daily weather)
     */
    async getDailyForecast(limit = Number.POSITIVE_INFINITY, includeToday = false, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH, { exclude: "alerts,current,minutely,hourly" }
            )
        )

        let data = response.data
        if (!includeToday)
            data.daily.shift()
        return dailyParser(data, limit)
    }

    /**
     * Getter for today's weather
     * 
     * @param {Options} [options={}] - options used only for this call 
     * @returns {Promise<dailyParser.DailyWeather>} weather object of today's weather **NOT the same as current!**
     */
    async getToday(options = {}) {
        return (await this.getDailyForecast(1, true, options))[0]
    }

    // ToDo: Add Date() substitues to start and end: 

    /**
     * Getter for alerts\
     * **Note:** some agencies provide the alert’s description only in a local language.
     * 
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Alert[]>} alerts 
     */
    async getAlerts(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH, { exclude: "current,minutely,hourly,daily" }
            )
        )

        let data = response.data
        return data.alerts ?? []
    }

    /**
     * Getter for every type of weather call and alerts
     * 
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<{
     *  lat: Number,
     *  lon: Number,
     *  timezone: String,
     *  timezone_offset: Number,
     *  current: currentParser.CurrentWeather,
     *  minutely: minutelyParser.MinutelyWeather[],
     *  hourly: hourlyParser.HourlyWeather[],
     *  daily: dailyParser.DailyWeather[],
     *  alerts: Alert[]
     * }>} object that contains everything
     */
    async getEverything(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH
            )
        )

        let data = response.data
        return {
            lat: data.lat,
            lon: data.lon,
            timezone: data.timezone,
            timezone_offset: data.timezone_offset,
            current: currentParser(data),
            minutely: minutelyParser(data, Number.POSITIVE_INFINITY),
            hourly: hourlyParser(data, Number.POSITIVE_INFINITY),
            daily: dailyParser(data, Number.POSITIVE_INFINITY),
            alerts: data.alerts
        }
    }

    /**
     * Getter for historical data about weather
     * 
     * @param {Date|Number|String} dt - Date from the **previous five days** (Unix time, UTC time zone)
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<{
     *  lat: Number,
     *  lon: Number,
     *  timezone: String,
     *  timezone_offset: Number,
     *  current: currentParser.CurrentWeather,
     *  hourly: hourlyParser.HourlyWeather[]
     * }>}
     */
    async getHistory(dt, options = {}) {
        if (dt === undefined) throw new Error("Provide time")
        await this.#uncacheLocation(options.key)
        dt = Math.round(new Date(dt).getTime() / 1000)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, ONECALL_PATH + "/timemachine", { dt }
            )
        )

        let data = response.data
        return {
            lat: data.lat,
            lon: data.lon,
            timezone: data.timezone,
            timezone_offset: data.timezone_offset,
            current: currentParser(data),
            hourly: hourlyParser(data, Number.POSITIVE_INFINITY)
        }
    }

    // Uncategorized Methods

    /**
     * Merges weather objects
     * 
     * @param {Array} weathers - array of weather objects that you want to merge
     * @returns merged object of weather provided in weathers parameter
     */
    mergeWeathers(weathers) {
        if (!Array.isArray(weathers)) throw new Error("Provide list of weather objects")
        weathers.reverse()
        return mergeObj({}, ...weathers)
    }

    /**
     * Getter for current data about air pollution
     * 
     * @param {Options} [options={}] - options used only for this call
     * @returns Air Pollution Object with data about current pollution
     */
    async getCurrentAirPollution(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, AIR_POLLUTION_PATH
            )
        )

        let data = response.data
        return singleAirPollutionParser(data)
    }

    /**
     * Getter for future data about air pollution
     * 
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns Array of Air Pollution Objects with data about future pollution
     */
    async getForecastedAirPollution(limit = Number.POSITIVE_INFINITY, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, AIR_POLLUTION_PATH + "/forecast"
            )
        )

        let data = response.data
        return listAirPollutionParser(data, limit)
    }

    /**
     * Getter for historical data about air pollution 
     * WARNING: Historical data is accessible from 27th November 2020
     * 
     * @param {Date|Number|String} from - Start date (unix time, UTC time zone)
     * @param {Date|Number|String} to - End date (unix time, UTC time zone)
     * @param {Options} [options={}] - options used only for this call
     * @returns Array of Air Pollution Objects with data about historical pollution
     */
    async getHistoryAirPollution(from, to, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

        let response = await this.#fetch(
            this.#createURL(
                options, AIR_POLLUTION_PATH + "/history", {
                start: Math.round(new Date(from).getTime() / 1000),
                end: Math.round(new Date(to).getTime() / 1000)
            }
            )
        )

        let data = response.data
        return listAirPollutionParser(data, Number.POSITIVE_INFINITY)
    }

    // helpers
    async #uncacheLocation(key) { // necessary for some setters to be synchronous
        if (this.#globalOptions.coordinates.lat && this.#globalOptions.coordinates.lon) return // ! what if lat or lon = 0  ?

        key = this.#globalOptions.key ?? key
        if (!key) return

        if (this.#globalOptions.locationName) {
            this.#globalOptions.coordinates = await this.#evaluateLocationByName(this.#globalOptions.locationName, key)
        } else if (this.#globalOptions.zipCode) {
            this.#globalOptions.coordinates = await this.#evaluateLocationByZipCode(this.#globalOptions.zipCode, key)
        }
    }

    #createURL(options, path = "", additionalParams = {}) {
        let url = new URL(path, API_ENDPOINT)

        url.searchParams.append("appid", options.key)
        url.searchParams.append("lat", options.coordinates.lat)
        url.searchParams.append("lon", options.coordinates.lon)

        if (options.lang)
            url.searchParams.append("lang", options.lang)
        if (options.units)
            url.searchParams.append("units", options.units)

        for (const [key, value] of Object.entries(additionalParams)) {
            url.searchParams.append(key, value)
        }

        return url.href
    }

    async #fetch(url) {
        let response
        try {
            response = await axios.get(url)
        } catch (error) {
            response = error.response
        }
        let data = response.data
        if (data.cod) {
            throw new Error(JSON.stringify(data))
        } else {
            return response
        }
    }

    async #parseOptions(options) {
        if (
            !(typeof options === "object") ||
            Array.isArray(options) ||
            options === null
        ) throw new Error("Provide {} object as options")
        for (const key in options) {
            if (Object.hasOwnProperty.call(options, key)) {
                const value = options[key]
                switch (key) {
                    case "key":
                        options.key = value
                        break

                    case "language":
                        options.lang = this.#evaluateLanguage(value)
                        break

                    case "units":
                        options.units = this.#evaluateUnits(value)
                        break

                    case "locationName":
                        options.coordinates = await this.#evaluateLocationByName(value, options.key || this.#globalOptions.key)
                        break

                    case "coordinates":
                        options.coordinates = this.#evaluateLocationByCoordinates(value.lat, value.lon)
                        break

                    case "zipCode":
                        options.coordinates = await this.#evaluateLocationByZipCode(value, options.key || this.#globalOptions.key)
                        break

                    default:
                        throw new Error("Unknown parameter: " + key)
                }
            }
        }
        return mergeObj({}, this.#globalOptions, options)
    }
}

module.exports = OpenWeatherAPI
