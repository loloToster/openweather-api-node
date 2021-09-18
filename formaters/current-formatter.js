// TODO: add icon url
const weatherModel = require("../weather-model")
const ICON_URL = ""

//https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
function removeEmpty(obj) {
    let newObj = {}
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key])
        else if (obj[key] !== undefined) newObj[key] = obj[key]
    })
    return newObj
}

function formater(data) {
    let current = weatherModel
    current.lat = data.lat
    current.lon = data.lon
    current.dt = data.current.dt
    current.timezone = data.timezone
    current.timezone_offset = data.timezone_offset
    current.astronomical.sunrise = data.current.sunrise
    current.astronomical.sunset = data.current.sunset
    current.weather.temp.main = data.current.temp
    current.weather.feels_like.main = data.current.feels_like
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
    current.weather.icon.url = ICON_URL + data.current.weather.icon
    current.weather.icon.raw = data.current.weather.icon
    return removeEmpty(current)
}

module.exports = formater
