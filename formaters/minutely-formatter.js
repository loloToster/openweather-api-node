const getWeatherModel = require("../weather-model")

function minutelyFormater(data, limit) {
    let newMinutely = []
    for (let i = 0; i < limit && i < data.minutely.length; i++) {
        let element = data.minutely[i]
        let newElement = getWeatherModel()
        newElement.lat = data.lat
        newElement.lon = data.lon
        newElement.dt = element.dt
        newElement.timezone = data.timezone
        newElement.timezone_offset = data.timezone_offset
        newElement.rain = element.precipitation
        newMinutely.push(newElement)
    }
    return newMinutely
}

module.exports = minutelyFormater
