export = getAirPollutionModel;
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
declare function getAirPollutionModel(): AirPollution;
declare namespace getAirPollutionModel {
    export { Components, AirPollution };
}
type AirPollution = {
    /**
     * Geographical coordinates of the location (latitude)
     */
    lat: number;
    /**
     * Geographical coordinates of the location (longitude)
     */
    lon: number;
    /**
     * Date and time, UTC
     */
    dt: Date;
    /**
     * Date and time, Unix, UTC
     */
    dt_raw: number;
    /**
     * Air Quality Index.
     */
    aqi: number;
    /**
     * String substitute of aqi field (only english)
     */
    aqi_name: string;
    components: Components;
};
type Components = {
    /**
     * Сoncentration of CO (Carbon monoxide), μg/m3
     */
    co: number;
    /**
     * Сoncentration of NO (Nitrogen monoxide), μg/m3
     */
    no: number;
    /**
     * Сoncentration of NO2 (Nitrogen dioxide), μg/m3
     */
    no2: number;
    /**
     * Сoncentration of O3 (Ozone), μg/m3
     */
    o3: number;
    /**
     * Сoncentration of SO2 (Sulphur dioxide), μg/m3
     */
    so2: number;
    /**
     * Сoncentration of PM2.5 (Fine particles matter), μg/m3
     */
    pm2_5: number;
    /**
     * Сoncentration of PM10 (Coarse particulate matter), μg/m3
     */
    pm10: number;
    /**
     * Сoncentration of NH3 (Ammonia), μg/m3
     */
    nh3: number;
};
