const getWeatherModel = require("../../models/weather-model")

/**
 * @typedef {Object} HourlyTemperatures
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 */

/**
 * @typedef {Object} HourlyFeelsLike
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 */

/**
 * @typedef {Object} HourlyWindData
 * @property {Number} speed Wind speed
 * @property {Number} gust Wind gust
 * @property {Number} deg Wind direction, degrees (meteorological)
 */

/**
 * @typedef {Object} HourlyIcon
 * @property {String} url Weather icon url
 * @property {String} raw Weather icon id
 */

/**
 * @typedef {Object} HourlyConditions
 * @property {HourlyTemperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {HourlyFeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} pressure Atmospheric pressure on the sea level, hPa
 * @property {Number} humidity Humidity, %
 * @property {Number} dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} clouds Cloudiness, %
 * @property {Number} uvi The maximum value of UV index for the day
 * @property {Number} visibility Average visibility, metres
 * @property {HourlyWindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} pop Probability of precipitation
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} snow Snow volume, mm
 * @property {Number} condition_id Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} main Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} description Description of the weather
 * @property {HourlyIcon} icon
 */

/**
 * @typedef {Object} HourlyWeather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {{}} astronomical
 * @property {HourlyConditions} weather
 */

/**
 * @returns {HourlyWeather[]}
 */
function hourlyParser(data, limit) {
    if (!data.hourly) return []
    let newHourly = []
    for (let i = 0; i < limit && i < data.hourly.length; i++) {
        let element = data.hourly[i]
        let newElement = getWeatherModel()
        newElement.lat = data.lat
        newElement.lon = data.lon
        newElement.dt = new Date(element.dt * 1000)
        newElement.dt_raw = element.dt
        newElement.timezone = data.timezone
        newElement.timezone_offset = data.timezone_offset
        newElement.weather.temp.cur = element.temp
        newElement.weather.feels_like.cur = element.temp
        newElement.weather.pressure = element.pressure
        newElement.weather.humidity = element.humidity
        newElement.weather.dew_point = element.dew_point
        newElement.weather.clouds = element.clouds
        newElement.weather.uvi = element.uvi
        newElement.weather.visibility = element.visibility
        newElement.weather.wind.speed = element.wind_speed
        newElement.weather.wind.gust = element.wind_gust
        newElement.weather.wind.deg = element.wind_deg
        newElement.weather.pop = element.pop
        newElement.weather.rain = element.rain ? element.rain["1h"] : 0
        newElement.weather.snow = element.snow ? element.snow["1h"] : 0
        element.weather = element.weather[0]
        newElement.weather.condition_id = element.weather.id
        newElement.weather.main = element.weather.main
        newElement.weather.description = element.weather.description
        newElement.weather.icon.url = `http://openweathermap.org/img/wn/${element.weather.icon}@2x.png`
        newElement.weather.icon.raw = element.weather.icon
        newHourly.push(newElement)
    }
    return newHourly
}

module.exports = hourlyParser
