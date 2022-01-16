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
],
    SUP_UNITS = ["standard", "metric", "imperial"]

const API_ENDPOINT = "https://api.openweathermap.org/",
    GEO_PATH = "geo/1.0/",
    DATA_PATH = "data/2.5/onecall"

const axios = require("axios").default

const currentParser = require("./parsers/weather/current-parser"),
    minutelyParser = require("./parsers/weather/minutely-parser"),
    hourlyParser = require("./parsers/weather/hourly-parser"),
    dailyParser = require("./parsers/weather/daily-parser")

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
 * @typedef Coordinates
 * @property {Number} lat
 * @property {Number} lon
 */

/**
 * @typedef Options
 * @property {String} key
 * @property {String} lang
 * @property {String} units
 * @property {Coordinates} coordinates
 * @property {String} units
 * @property {String} locationName
 * @property {String} zipCode
 */

class OpenWeatherAPI {

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
     * @param {Options} globalOptions - object that defines global options
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
     * @returns {Object} global options
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
     * @returns global API key
     */
    getKey() {
        return this.#globalOptions.key
    }

    /**
     * Sets global language (Language must be listed [here](https://openweathermap.org/current#multi))
     * 
     * @param {String} lang - language
     */
    setLanguage(lang) {
        this.#globalOptions.lang = this.#evaluateLanguage(lang)
    }

    /**
     * Getter for global language
     * 
     * @returns global language
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
     * @param {String} units - units (Only **standard**, **metric** or **imperial** are supported)
     */
    setUnits(units) {
        this.#globalOptions.units = this.#evaluateUnits(units)
    }

    /**
     * Getter for global units
     * 
     * @returns global units
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
     * @param {Options} options - options used only for this call
     * @returns location
     */
    async getLocation(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(`${API_ENDPOINT}${GEO_PATH}reverse?lat=${options.coordinates.lat}&lon=${options.coordinates.lon}&limit=1&appid=${options.key}`)
        let data = response.data
        return data.length ? data[0] : null
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
        let response = await this.#fetch(this.#createURL(options, "alerts,minutely,hourly,daily"))
        let data = response.data
        return currentParser(data)
    }

    /**
     * Getter for minutely weather
     * 
     * @param {Number} limit - maximum length of returned array
     * @param {Options} options - options used only for this call
     * @returns array of Weather objects, one for every next minute (Empty if API returned no info about minutely weather)
     */
    async getMinutelyForecast(limit = Number.POSITIVE_INFINITY, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(this.#createURL(options, "alerts,current,hourly,daily"))
        let data = response.data
        return minutelyParser(data, limit)
    }

    /**
     * Getter for hourly weather
     * 
     * @param {Number} limit - maximum length of returned array
     * @param {Options} options - options used only for this call
     * @returns array of Weather objects, one for every next hour (Empty if API returned no info about hourly weather)
     */
    async getHourlyForecast(limit = Number.POSITIVE_INFINITY, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(this.#createURL(options, "alerts,current,minutely,daily"))
        let data = response.data
        return hourlyParser(data, limit)
    }

    /**
     * 
     * @param {Number} limit - maximum length of returned array
     * @param {Boolean} includeToday - boolean indicating whether to include today's weather in returned array
     * @param {Options} options - options used only for this call 
     * @returns array of Weather objects, one for every next day (Empty if API returned no info about daily weather)
     */
    async getDailyForecast(limit = Number.POSITIVE_INFINITY, includeToday = false, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(this.#createURL(options, "alerts,current,minutely,hourly"))
        let data = response.data
        if (!includeToday)
            data.daily.shift()
        return dailyParser(data, limit)
    }

    /**
     * Getter for today's weather
     * 
     * @param {Options} options - options used only for this call 
     * @returns weather object of today's weather **NOT the same as current!**
     */
    async getToday(options = {}) {
        return (await this.getDailyForecast(1, true, options))[0]
    }

    /**
     * Getter for alerts
     * 
     * @param {Options} options - options used only for this call
     * @returns alerts (undefined if API returned no info about alerts)
     */
    async getAlerts(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(this.#createURL(options, "current,minutely,hourly,daily"))
        let data = response.data
        return data.alerts
    }

    /**
     * Getter for every type of weather call and alerts
     * 
     * @param {Options} options - options used only for this call
     * @returns object that contains everything
     */
    async getEverything(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(this.#createURL(options))
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
     * @param {Options} options - options used only for this call
     */
    async getHistory(dt, options = {}) {
        await this.#uncacheLocation(options.key)
        dt = Math.round(new Date(dt).getTime() / 1000)
        options = await this.#parseOptions(options)
        let response = await this.#fetch(this.#createURL(options, false, dt))
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
     * @param {Options} options - options used only for this call
     */
    async getCurrentAirPollution(options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

    }

    /**
     * Getter for future data about air pollution
     * 
     * @param {Number} limit - maximum length of returned array
     * @param {Options} options - options used only for this call
     */
    async getForecastedAirPollution(limit = Number.POSITIVE_INFINITY, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

    }

    /**
     * Getter for historical data about air pollution
     * 
     * @param {Date|Number|String} from
     * @param {Date|Number|String} to
     * @param {Options} options - options used only for this call
     */
    async getHistoryAirPollution(from, to, options = {}) {
        await this.#uncacheLocation(options.key)
        options = await this.#parseOptions(options)

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

    #createURL(options, exclude = false, dt = false) {
        let url = new URL(DATA_PATH + (dt === false ? "" : "/timemachine"), API_ENDPOINT)
        url.searchParams.append("appid", options.key)
        url.searchParams.append("lat", options.coordinates.lat)
        url.searchParams.append("lon", options.coordinates.lon)
        if (options.lang)
            url.searchParams.append("lang", options.lang)
        if (options.units)
            url.searchParams.append("units", options.units)
        if (exclude)
            url.searchParams.append("exclude", exclude)
        if (dt)
            url.searchParams.append("dt", dt)
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
