const getAirPollutionModel = require("../../models/airpollution-model")

const names = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"]

function singleParser(data) {
    let single = getAirPollutionModel()
    single.lat = data.coord[0]
    single.lon = data.coord[1]
    let element = data.list[0]
    single.dt = new Date(element.dt * 1000)
    single.dt_raw = element.dt
    single.aqi = element.main.aqi
    single.aqi_name = names[element.main.aqi]
    single.components = { ...element.components }
    return single
}

module.exports = singleParser
