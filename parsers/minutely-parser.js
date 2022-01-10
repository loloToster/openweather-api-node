const getWeatherModel = require("../weather-model")

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
