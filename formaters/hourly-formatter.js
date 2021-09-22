const getWeatherModel = require("../weather-model")
const ICON_URL = ""

function hourlyFormater(data, limit) {
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
        newElement.weather.temp.main = element.temp
        newElement.weather.feels_like.main = element.temp
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
        newElement.weather.description = element.weather.description
        newElement.weather.icon.url = ICON_URL + element.weather.icon
        newElement.weather.icon.raw = element.weather.icon
        newHourly.push(newElement)
    }
    return newHourly
}

module.exports = hourlyFormater
