const supLang = [
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
    supUnits = ["standard", "metric", "imperial"]

const API_ENDPOINT = "https://api.openweathermap.org/",
    GEO_PATH = "geo/1.0/",
    DATA_PATH = "data/2.5/onecall"

const fetch = require("node-fetch"),
    syncFetch = require("sync-fetch")

const _ = require("lodash")

const currentFormatter = require("./formaters/current-formatter"),
    minutelyFormatter = require("./formaters/minutely-formatter"),
    hourlyFormatter = require("./formaters/hourly-formatter"),
    dailyFormatter = require("./formaters/daily-formatter")

class OpenWeatherAPI {
    #globalOptions = {
        key: undefined,
        lang: undefined,
        units: undefined,
        coordinates: {
            lat: undefined,
            lon: undefined
        },
        locationName: undefined
    }

    constructor(options) {
        for (const key in options) {
            if (Object.hasOwnProperty.call(options, key)) {
                const value = options[key]
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
                        /* let response = syncFetch(`${API_ENDPOINT}${GEO_PATH}direct?q=${value}&limit=1&appid=${this.#globalOptions.key}`)
                        let data = response.json()[0]
                        this.#globalOptions.location = {
                            lat: data.lat,
                            lon: data.lon
                        } */
                        break

                    case "coordinates":
                        this.setLocationByCoordinates(value.lat, value.lon)
                        break

                    default:
                        throw Error("Unknown parameter: " + key)
                }
            }
        }
    }

    getGlobalOptions() {
        return this.#globalOptions
    }

    setKey(key) {
        this.#globalOptions.key = key
    }

    getKey() {
        return this.#globalOptions.key
    }

    setLanguage(lang) {
        this.#globalOptions.lang = this.#evaluateLanguage(lang)
    }

    getLanguage() {
        return this.#globalOptions.lang
    }

    #evaluateLanguage(lang) {
        lang = lang.toLowerCase()
        if (supLang.includes(lang))
            return lang
        else
            throw Error("Unsupported language: " + lang)
    }

    setUnits(unit) {
        this.#globalOptions.units = this.#evaluateUnits(unit)
    }

    getUnits() {
        return this.#globalOptions.units
    }

    #evaluateUnits(unit) {
        unit = unit.toLowerCase()
        if (supUnits.includes(unit))
            return unit
        else
            throw Error("Unsupported unit: " + unit)
    }

    setLocationByName(name) { // - location setter
        this.#globalOptions.coordinates.lat = undefined
        this.#globalOptions.coordinates.lon = undefined
        this.#globalOptions.locationName = name
    }

    async #evaluateLocationByName(name) {
        let response = await fetch(`${API_ENDPOINT}${GEO_PATH}direct?q=${name}&limit=1&appid=${this.#globalOptions.key}`)
        let data = (await response.json())[0]
        return {
            lat: data.lat,
            lon: data.lon
        }
    }

    setLocationByCoordinates(lat, lon) { // - location setter
        this.#globalOptions.coordinates.lat = lat
        this.#globalOptions.coordinates.lon = lon
        this.#globalOptions.locationName = undefined
    }

    async getLocation(options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(`${API_ENDPOINT}${GEO_PATH}reverse?lat=${options.coordinates.lat}&lon=${options.coordinates.lon}&limit=1&appid=${options.key}`)
        let data = await response.json()
        return data.length ? data[0] : null
    }

    // Weather getters
    async getCurrent(options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(this.#createURL(options, "alerts,minutely,hourly,daily"))
        let data = await response.json()
        return currentFormatter(data)
    }

    async getMinutelyForecast(limit = Number.POSITIVE_INFINITY, options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(this.#createURL(options, "alerts,current,hourly,daily"))
        let data = await response.json()
        return minutelyFormatter(data, limit)
    }

    async getHourlyForecast(limit = Number.POSITIVE_INFINITY, options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(this.#createURL(options, "alerts,current,minutely,daily"))
        let data = await response.json()
        return hourlyFormatter(data, limit)
    }

    async getToday(options) {
        await this.#uncacheLocation()
        return (await this.getDailyForecast(1, true, options))[0]
    }

    async getDailyForecast(limit = Number.POSITIVE_INFINITY, includeToday = false, options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(this.#createURL(options, "alerts,current,minutely,hourly"))
        let data = await response.json()
        if (!includeToday)
            data.daily.shift()
        return dailyFormatter(data, limit)
    }

    async getAlerts(options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(this.#createURL(options, "current,minutely,hourly,daily"))
        let data = await response.json()
        return data.alerts
    }

    async getEverything(options) {
        await this.#uncacheLocation()
        options = await this.#formatOptions(options)
        let response = await fetch(this.#createURL(options))
        let data = await response.json()
        return {
            lat: data.lat,
            lon: data.lon,
            timezone: data.timezone,
            timezone_offset: data.timezone_offset,
            current: currentFormatter(data),
            minutely: minutelyFormatter(data, Number.POSITIVE_INFINITY),
            hourly: hourlyFormatter(data, Number.POSITIVE_INFINITY),
            daily: dailyFormatter(data, Number.POSITIVE_INFINITY),
            alerts: data.alerts
        }
    }

    // Weather Methods
    mergeWeathers(weathers) {
        weathers.reverse()
        return _.merge(...weathers)
    }

    async #uncacheLocation() {
        if (this.#globalOptions.coordinates.lat && this.#globalOptions.coordinates.lon) return
        if (this.#globalOptions.locationName) {
            this.#globalOptions.coordinates = await this.#evaluateLocationByName(this.#globalOptions.locationName)
        }
    }

    #createURL(options, exclude) {
        let url = new URL(DATA_PATH, API_ENDPOINT)
        url.searchParams.append("appid", options.key)
        url.searchParams.append("lat", this.#globalOptions.coordinates.lat)
        url.searchParams.append("lon", this.#globalOptions.coordinates.lon)
        if (options.lang)
            url.searchParams.append("lang", options.lang)
        if (options.units)
            url.searchParams.append("units", options.units)
        if (exclude)
            url.searchParams.append("exclude", exclude)
        return url.href
    }

    async #formatOptions(options) {
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
                        options.coordinates = await this.#evaluateLocationByName(value)
                        break

                    case "coordinates":
                        options.coordinates = { lat: value.lat, lon: value.lon }
                        break

                    default:
                        throw Error("Unknown parameter: " + key)
                }
            }
        }
        return _.merge(this.#globalOptions, options)
    }
}

module.exports = OpenWeatherAPI
