const getWeatherModel = require("../../models/weather-model")

/**
 * @typedef {Object} MinutelyConditions
 * @property {{}} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {{}} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {{}} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} rain Precipitation volume, mm
 * @property {{}} icon
 */

/**
 * @typedef {Object} MinutelyWeather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {{}} astronomical
 * @property {MinutelyConditions} weather
 */

/**
 * @returns {MinutelyWeather[]}
 */
function minutelyParser(data, limit) {
    if (!data.minutely) return []
    let newMinutely = []
    for (let i = 0; i < limit && i < data.minutely.length; i++) {
        let element = data.minutely[i]
        let newElement = getWeatherModel()
        newElement.lat = data.lat
        newElement.lon = data.lon
        newElement.dt = new Date(element.dt * 1000)
        newElement.dt_raw = element.dt
        newElement.timezone = data.timezone
        newElement.timezone_offset = data.timezone_offset
        newElement.weather.rain = element.precipitation
        newMinutely.push(newElement)
    }
    return newMinutely
}

module.exports = minutelyParser
