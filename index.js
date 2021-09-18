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
    #key
    #lang
    #location = {
        lat: null,
        lon: null
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

                    case "cityName":
                        this.setLocationByCityName(value)
                        break

                    case "coordinates":
                        this.setLocationByCoordinates(value)
                        break

                    case "zipCode":
                        this.setLocationByZipCode(value)
                        break

                    default:
                        throw Error("Unknown parameter: " + key)
                }
            }
        }
    }

    setKey(key) {
        this.#key = key
    }

    getKey() {
        return this.#key
    }

    setLanguage(lang) {
        lang = lang.toLowerCase()
        if (supLang.includes(lang))
            this.#lang = lang
        else
            throw Error("Unsupported language: " + lang)
    }

    getLanguage() {
        return this.#lang
    }

    setLocationByCityName(name) {
        let response = syncFetch(`${API_ENDPOINT}${GEO_PATH}direct?q=${name}&limit=1&appid=${this.#key}`)
        let data = response.json()[0]
        this.#location.lat = data.lat
        this.#location.lon = data.lon
    }

    setLocationByCoordinates(lat, lon) {
        this.#location.lat = lat
        this.#location.lon = lon
    }

    setLocationByZipCode(code) {
        let response = syncFetch(`${API_ENDPOINT}${GEO_PATH}zip?zip=${code}&appid=${this.#key}`)
        let data = response.json()
        this.#location.lat = data.lat
        this.#location.lon = data.lon
    }

    async getLocation() {
        let response = await fetch(`${API_ENDPOINT}${GEO_PATH}reverse?lat=${this.#location.lat}&lon=${this.#location.lon}&limit=1&appid=${this.#key}`)
        console.log(response)
        let data = await response.json()
        return data[0]
    }

    async getCurrentWeather(options) {

    }

    async getMinutelyForecast(limit = 60, options) {

    }

    async getHourlyForecast(limit = 48, options) {

    }

    async getDailyForecast(limit = 7, options) {

    }

    async getAlerts(options) {

    }

    async getEverything(options) {

    }

    formatOptions(options) {
        return options
    }
}

module.exports = OpenWeatherAPI
