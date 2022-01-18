const getWeatherModel = require("../../models/weather-model")

/**
 * @typedef {Object} CurrentAstronomical
 * @property {Date} sunrise Sunrise time, Unix, UTC
 * @property {Number} sunrise_raw
 * @property {Date} sunset Sunset time, Unix, UTC
 * @property {Number} sunset_raw
 */

/**
 * @typedef {Object} CurrentTemperatures
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 */

/**
 * @typedef {Object} CurrentFeelsLike
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 */

/**
 * @typedef {Object} CurrentWindData
 * @property {Number} speed Wind speed
 * @property {Number} gust Wind gust
 * @property {Number} deg Wind direction, degrees (meteorological)
 */

/**
 * @typedef {Object} CurrentIcon
 * @property {String} url Weather icon url
 * @property {String} raw Weather icon id
 */

/**
 * @typedef {Object} CurrentConditions
 * @property {CurrentTemperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {CurrentFeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} pressure Atmospheric pressure on the sea level, hPa
 * @property {Number} humidity Humidity, %
 * @property {Number} dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} clouds Cloudiness, %
 * @property {Number} uvi The maximum value of UV index for the day
 * @property {Number} visibility Average visibility, metres
 * @property {CurrentWindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} snow Snow volume, mm
 * @property {Number} condition_id Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} main Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} description Description of the weather
 * @property {CurrentIcon} icon
 */

/**
 * @typedef {Object} CurrentWeather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {CurrentAstronomical} astronomical
 * @property {CurrentConditions} weather
 */

/**
 * @returns {CurrentWeather}
 */
function currentParser(data) {
    let current = getWeatherModel()
    current.lat = data.lat
    current.lon = data.lon
    current.dt = new Date(data.current.dt * 1000)
    current.dt_raw = data.current.dt
    current.timezone = data.timezone
    current.timezone_offset = data.timezone_offset
    current.astronomical.sunrise = new Date(data.current.sunrise * 1000)
    current.astronomical.sunrise_raw = data.current.sunrise
    current.astronomical.sunset = new Date(data.current.sunset * 1000)
    current.astronomical.sunset_raw = data.current.sunset
    current.weather.temp.cur = data.current.temp
    current.weather.feels_like.cur = data.current.feels_like
    current.weather.pressure = data.current.pressure
    current.weather.humidity = data.current.humidity
    current.weather.dew_point = data.current.dew_point
    current.weather.clouds = data.current.clouds
    current.weather.uvi = data.current.uvi
    current.weather.visibility = data.current.visibility
    current.weather.wind.speed = data.current.wind_speed
    current.weather.wind.gust = data.current.wind_gust
    current.weather.wind.deg = data.current.wind_deg
    current.weather.rain = data.current.rain ? data.current.rain["1h"] : 0
    current.weather.snow = data.current.snow ? data.current.snow["1h"] : 0
    data.current.weather = data.current.weather[0]
    current.weather.condition_id = data.current.weather.id
    current.weather.main = data.current.weather.main
    current.weather.description = data.current.weather.description
    current.weather.icon.url = `http://openweathermap.org/img/wn/${data.current.weather.icon}@2x.png`
    current.weather.icon.raw = data.current.weather.icon
    return current
}

module.exports = currentParser
