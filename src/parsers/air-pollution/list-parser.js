const getAirPollutionModel = require("../../models/airpollution-model")

const names = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"]

function listParser(data, limit) {
    if (!data.list) return []
    let list = []
    for (let i = 0; i < limit && i < data.list.length; i++) {
        let element = data.list[i]
        let newElement = getAirPollutionModel()
        newElement.lat = data.coord.lat
        newElement.lon = data.coord.lon
        newElement.dt = new Date(element.dt * 1000)
        newElement.dt_raw = element.dt
        newElement.aqi = element.main.aqi
        newElement.aqi_name = names[element.main.aqi]
        newElement.components = { ...element.components }
        list.push(newElement)
    }
    return list
}

module.exports = listParser
