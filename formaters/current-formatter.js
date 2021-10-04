const getWeatherModel = require("../weather-model")

function formater(data) {
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

module.exports = formater
