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
]

const fetch = require("node-fetch"),
    syncFetch = require("sync-fetch")

const API_ENDPOINT = "https://api.openweathermap.org/",
    GEO_PATH = "geo/1.0/",
    DATA_PATH = "data/2.5/"

class OpenWeatherAPI {
    #globalOptions = {
        key: undefined,
        lang: undefined,
        location: {
            lat: undefined,
            lon: undefined
        }
    }

    constructor(options) {
        this.#globalOptions = this.formatOptions(options)
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

    async getLocation() {
        let response = await fetch(`${API_ENDPOINT}${GEO_PATH}reverse?lat=${this.#globalOptions.location.lat}&lon=${this.#globalOptions.location.lon}&limit=1&appid=${this.#globalOptions.key}`)
        console.log(response)
        let data = await response.json()
        return data[0]
    }

    async getCurrentWeather(options) {
        options = this.formatOptions(options)

    }

    async getMinutelyForecast(limit = 60, options) {
        options = this.formatOptions(options)

    }

    async getHourlyForecast(limit = 48, options) {
        options = this.formatOptions(options)

    }

    async getDailyForecast(limit = 7, options) {
        options = this.formatOptions(options)

    }

    async getAlerts(options) {
        options = this.formatOptions(options)

    }

    async getEverything(options) {
        options = this.formatOptions(options)

    }

    formatOptions(options) {
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

                    case "cityName":
                        newOptions.location = this.evaluateLocationByCityName(value)
                        break

                    case "coordinates":
                        newOptions.location = { lat: value.lat, lon: value.lon }
                        break

                    case "zipCode":
                        newOptions.location = this.evaluateLocationByZipCode(value)
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
