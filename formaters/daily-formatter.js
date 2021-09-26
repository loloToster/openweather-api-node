const getWeatherModel = require("../weather-model")
const ICON_URL = ""

function dailyFormater(data, limit) {
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
        newElement.weather.description = element.weather.description
        newElement.weather.icon.url = `http://openweathermap.org/img/wn/${element.weather.icon}@2x.png`
        newElement.weather.icon.raw = element.weather.icon
        newDaily.push(newElement)
    }
    return newDaily
}

module.exports = dailyFormater

