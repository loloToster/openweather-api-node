export = minutelyParser;
/**
 * @typedef {Object} MinutelyConditions
 * @property {{}} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {{}} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {{}} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} rain Precipitation volume, mm
 * @property {{}} icon
 */
/**
 * @typedef {Object} MinutelyWeather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {{}} astronomical
 * @property {MinutelyConditions} weather
 */
/**
 * @returns {MinutelyWeather[]}
 */
declare function minutelyParser(data: any, limit: any): MinutelyWeather[];
declare namespace minutelyParser {
    export { MinutelyConditions, MinutelyWeather };
}
type MinutelyWeather = {
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
     * Date and time, Unix, UTC
     */
    timezone: string;
    /**
     * Date and time, Unix, UTC
     */
    timezone_offset: number;
    astronomical: {};
    weather: MinutelyConditions;
};
type MinutelyConditions = {
    /**
     * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    temp: {};
    /**
     * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    feels_like: {};
    /**
     * Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
     */
    wind: {};
    /**
     * Precipitation volume, mm
     */
    rain: number;
    icon: {};
};
