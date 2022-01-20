const getWeatherModel = require("../../models/weather-model")

/**
 * @typedef {Object} DailyAstronomical
 * @property {Date} sunrise Sunrise time, Unix, UTC
 * @property {Number} sunrise_raw
 * @property {Date} sunset Sunset time, Unix, UTC
 * @property {Number} sunset_raw
 * @property {Date} moonrise The time of when the moon rises for this day, Unix, UTC
 * @property {Number} moonrise_raw
 * @property {Date} moonset The time of when the moon sets for this day, Unix, UTC
 * @property {Number} moonset_raw
 * @property {Number} moon_phase Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
 */

/**
 * @typedef {Object} DailyTemperatures
 * @property {Number} morn Morning temperature
 * @property {Number} day Day temperature
 * @property {Number} eve Evening temperature
 * @property {Number} night Night temperature
 * @property {Number} min Lowest daily temperature
 * @property {Number} max Highest daily temperature
 */

/**
 * @typedef {Object} DailyFeelsLike
 * @property {Number} morn Morning temperature
 * @property {Number} day Day temperature
 * @property {Number} eve Evening temperature
 * @property {Number} night Night temperature
 */

/**
 * @typedef {Object} DailyWindData
 * @property {Number} speed Wind speed
 * @property {Number} gust Wind gust
 * @property {Number} deg Wind direction, degrees (meteorological)
 */

/**
 * @typedef {Object} DailyIcon
 * @property {String} url Weather icon url
 * @property {String} raw Weather icon id
 */

/**
 * @typedef {Object} DailyConditions
 * @property {DailyTemperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {DailyFeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} pressure Atmospheric pressure on the sea level, hPa
 * @property {Number} humidity Humidity, %
 * @property {Number} dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} clouds Cloudiness, %
 * @property {Number} uvi The maximum value of UV index for the day
 * @property {DailyWindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} pop Probability of precipitation
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} snow Snow volume, mm
 * @property {Number} condition_id Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} main Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} description Description of the weather
 * @property {DailyIcon} icon
 */

/**
 * @typedef {Object} DailyWeather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {DailyAstronomical} astronomical
 * @property {DailyConditions} weather
 */


/**
 * @returns {DailyWeather[]}
 */
function dailyParser(data, limit) {
    if (!data.daily) return []
    let newDaily = []
    for (let i = 0; i < limit && i < data.daily.length; i++) {
        let element = data.daily[i]
        let newElement = getWeatherModel()
        newElement.lat = data.lat
        newElement.lon = data.lon
        newElement.dt = new Date(element.dt * 1000)
        newElement.dt_raw = element.dt
        newElement.timezone = data.timezone
        newElement.timezone_offset = data.timezone_offset
        newElement.astronomical.sunrise = new Date(element.sunrise * 1000)
        newElement.astronomical.sunrise_raw = element.sunrise
        newElement.astronomical.sunset = new Date(element.sunset * 1000)
        newElement.astronomical.sunset_raw = element.sunset
        newElement.astronomical.moonrise = new Date(element.moonrise * 1000)
        newElement.astronomical.moonrise_raw = element.moonrise
        newElement.astronomical.moonset = new Date(element.moonset * 1000)
        newElement.astronomical.moonset_raw = element.moonset
        newElement.astronomical.moon_phase = element.moon_phase
        newElement.weather.temp.morn = element.temp.morn
        newElement.weather.temp.day = element.temp.day
        newElement.weather.temp.eve = element.temp.eve
        newElement.weather.temp.night = element.temp.night
        newElement.weather.temp.min = element.temp.min
        newElement.weather.temp.max = element.temp.max
        newElement.weather.feels_like.day = element.feels_like.day
        newElement.weather.feels_like.night = element.feels_like.night
        newElement.weather.feels_like.eve = element.feels_like.eve
        newElement.weather.feels_like.morn = element.feels_like.morn
        newElement.weather.pressure = element.pressure
        newElement.weather.humidity = element.humidity
        newElement.weather.dew_point = element.dew_point
        newElement.weather.clouds = element.clouds
        newElement.weather.uvi = element.uvi
        newElement.weather.wind.speed = element.wind_speed
        newElement.weather.wind.gust = element.wind_gust
        newElement.weather.wind.deg = element.wind_deg
        newElement.weather.pop = element.pop
        newElement.weather.rain = element.rain ? element.rain : 0
        newElement.weather.snow = element.snow ? element.snow : 0
        element.weather = element.weather[0]
        newElement.weather.condition_id = element.weather.id
        newElement.weather.main = element.weather.main
        newElement.weather.description = element.weather.description
        newElement.weather.icon.url = `http://openweathermap.org/img/wn/${element.weather.icon}@2x.png`
        newElement.weather.icon.raw = element.weather.icon
        newDaily.push(newElement)
    }
    return newDaily
}

module.exports = dailyParser

