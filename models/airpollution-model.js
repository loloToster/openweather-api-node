const airPollutionModel = {
    lat: undefined, // Geographical coordinates of the location (latitude)
    lon: undefined, // Geographical coordinates of the location (longitude)
    dt: undefined,  // Date and time
    dt_raw: undefined, // Date and time, Unix, UTC
    aqi: undefined, // Air Quality Index.
    aqi_name: undefined,// String substitute of aqi field (only english)
    components: {
        co: undefined, // Сoncentration of CO (Carbon monoxide), μg/m3
        no: undefined, // Сoncentration of NO (Nitrogen monoxide), μg/m3
        no2: undefined, // Сoncentration of NO2 (Nitrogen dioxide), μg/m3
        o3: undefined, // Сoncentration of O3 (Ozone), μg/m3
        so2: undefined, // Сoncentration of SO2 (Sulphur dioxide), μg/m3
        pm2_5: undefined, // Сoncentration of PM2.5 (Fine particles matter), μg/m3
        pm10: undefined, // Сoncentration of PM10 (Coarse particulate matter), μg/m3
        nh3: undefined // Сoncentration of NH3 (Ammonia), μg/m3
    }
}

function getAirPollutionModel() {
    return JSON.parse(JSON.stringify(airPollutionModel))
}

module.exports = getAirPollutionModel
