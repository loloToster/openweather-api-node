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

const weatherModel = require("./weather-model")

const fetch = require("node-fetch"),
    syncFetch = require("sync-fetch")

const currentFormatter = require("./formaters/current-formatter"),
    minutelyFormatter = require("./formaters/minutely-formatter"),
    hourlyFormatter = require("./formaters/hourly-formatter"),
    dailyFormatter = require("./formaters/daily-formatter")

class OpenWeatherAPI {
    #globalOptions = {
        key: undefined,
        lang: undefined,
        units: undefined,
        location: {
            lat: undefined,
            lon: undefined
        }
    }

    constructor(options) {
        this.#globalOptions = this.#formatOptions(options)
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
        this.#globalOptions.lang = this.evaluateLanguage(lang)
    }

    evaluateLanguage(lang) {
        lang = lang.toLowerCase()
        if (supLang.includes(lang))
            return lang
        else
            throw Error("Unsupported language: " + lang)
    }

    setUnits(unit) {
        this.#globalOptions.units = this.evaluateUnits(unit)
    }

    evaluateUnits(unit) {
        unit = unit.toLowerCase()
        if (supUnits.includes(unit))
            return unit
        else
            throw Error("Unsupported unit: " + unit)
    }

    getLanguage() {
        return this.#globalOptions.lang
    }

    setLocationByCityName(name) {
        this.#globalOptions.location = this.evaluateLocationByCityName(name)
    }

    evaluateLocationByCityName(name) {
        let response = syncFetch(`${API_ENDPOINT}${GEO_PATH}direct?q=${name}&limit=1&appid=${this.#globalOptions.key}`)
        let data = response.json()[0]
        return {
            lat: data.lat,
            lon: data.lon
        }
    }

    setLocationByCoordinates(location) {
        this.#globalOptions.location = {
            lat: location.lat,
            lon: location.lon
        }
    }

    setLocationByZipCode(code) {
        this.#globalOptions.location = this.evaluateLocationByZipCode(code)
    }

    evaluateLocationByZipCode(code) {
        let response = syncFetch(`${API_ENDPOINT}${GEO_PATH}zip?zip=${code}&appid=${this.#globalOptions.key}`)
        let data = response.json()
        return {
            lat: data.lat,
            lon: data.lon
        }
    }

    async getLocation(options) {
        options = this.#formatOptions(options)
        let response = await fetch(`${API_ENDPOINT}${GEO_PATH}reverse?lat=${options.location.lat}&lon=${options.location.lon}&limit=1&appid=${options.key}`)
        console.log(response)
        let data = await response.json()
        return data.length ? data[0] : null
    }

    async getCurrent(options) {
        options = this.#formatOptions(options)
        let response = await fetch(this.#createURL(options, "alerts,minutely,hourly,daily"))
        let data = await response.json()
        return currentFormatter(data)
    }

    async getMinutelyForecast(limit = 60, options) {
        options = this.#formatOptions(options)
        let response = await fetch(this.#createURL(options))
        let data = await response.json()
        return currentFormatter(data)
    }

    async getHourlyForecast(limit = 48, options) {
        options = this.#formatOptions(options)
        let response = await fetch(this.#createURL(options))
        let data = await response.json()
        return currentFormatter(data)
    }

    async getDailyForecast(limit = 7, options) {
        options = this.#formatOptions(options)
        let response = await fetch(this.#createURL(options))
        let data = await response.json()
        return currentFormatter(data)
    }

    async getAlerts(options) {
        options = this.#formatOptions(options)
        let response = await fetch(this.#createURL(options))
        let data = await response.json()
        return data.alerts
    }

    async getEverything(options) {
        options = this.#formatOptions(options)
        let response = await fetch(this.#createURL(options))

    }

    #createURL(options, exclude) {
        let url = new URL(DATA_PATH, API_ENDPOINT)
        url.searchParams.append("appid", options.key)
        url.searchParams.append("lat", options.location.lat)
        url.searchParams.append("lon", options.location.lon)
        if (options.lang)
            url.searchParams.append("lang", options.lang)
        if (options.units)
            url.searchParams.append("units", options.units)
        if (exclude)
            url.searchParams.append("exclude", exclude)
        return url.href
    }

    #formatOptions(options) {
        let newOptions = this.#globalOptions
        for (const key in options) {
            if (Object.hasOwnProperty.call(options, key)) {
                const value = options[key]
                switch (key) {
                    case "key":
                        newOptions.key = value
                        break

                    case "language":
                        newOptions.lang = this.evaluateLanguage(value)
                        break

                    case "units":
                        newOptions.units = this.evaluateUnits(value)
                        break

                    case "cityName":
                        newOptions.location = this.evaluateLocationByCityName(value)
                        break

                    case "zipCode":
                        newOptions.location = this.evaluateLocationByZipCode(value)
                        break

                    case "coordinates":
                        newOptions.location = { lat: value.lat, lon: value.lon }
                        break

                    default:
                        throw Error("Unknown parameter: " + key)
                }
            }
        }
        return newOptions
    }
}

module.exports = OpenWeatherAPI
