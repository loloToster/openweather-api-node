const airPollutionModel = {
    lat: undefined,
    lon: undefined,
    dt: undefined,
    dt_raw: undefined,
    aqi: undefined,
    aqi_name: undefined,
    components: {
        co: undefined,
        no: undefined,
        no2: undefined,
        o3: undefined,
        so2: undefined,
        pm2_5: undefined,
        pm10: undefined,
        nh3: undefined
    }
}

/**
 * @typedef {Object} Components
 * @property {Number} co Сoncentration of CO (Carbon monoxide), μg/m3
 * @property {Number} no Сoncentration of NO (Nitrogen monoxide), μg/m3
 * @property {Number} no2 Сoncentration of NO2 (Nitrogen dioxide), μg/m3
 * @property {Number} o3 Сoncentration of O3 (Ozone), μg/m3
 * @property {Number} so2 Сoncentration of SO2 (Sulphur dioxide), μg/m3
 * @property {Number} pm2_5 Сoncentration of PM2.5 (Fine particles matter), μg/m3
 * @property {Number} pm10 Сoncentration of PM10 (Coarse particulate matter), μg/m3
 * @property {Number} nh3 Сoncentration of NH3 (Ammonia), μg/m3
 */

/**
 * @typedef {Object} AirPollution
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {Number} aqi Air Quality Index.
 * @property {String} aqi_name String substitute of aqi field (only english)
 * @property {Components} components
 */

/**
 * @returns {AirPollution}
 */
function getAirPollutionModel() {
    return JSON.parse(JSON.stringify(airPollutionModel))
}

module.exports = getAirPollutionModel
