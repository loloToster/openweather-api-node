export = OpenWeatherAPI;
/**
 * @typedef Coordinates
 * @property {Number} lat
 * @property {Number} lon
 */
/**
 * @typedef Options
 * @property {String} [key]
 * @property {Language} [lang]
 * @property {String} [units]
 * @property {Coordinates} [coordinates]
 * @property {Unit} [units]
 * @property {String} [locationName]
 * @property {String} [zipCode]
 */
/**
 * @typedef Location
 * @property {String} name Name of the found location
 * @property {Object} local_names
 * * local_names.[language code] - Name of the found location in different languages. The list of names can be different for different locations
 * * local_names.ascii - Internal field
 * * local_names.feature_name - Internal field
 * @property {Number} lat Geographical coordinates of the found location (latitude)
 * @property {Number} lon Geographical coordinates of the found location (longitude)
 * @property {String} country Geographical coordinates of the found location (longitude)
 * @property {String|undefined} state State of the found location (where available)
 */
declare class OpenWeatherAPI {
    /**
     * Constructor of the class. You can specify global options here
     *
     * @constructor
     * @param {Options} [globalOptions={}] - object that defines global options
     * @returns OpenWeatherAPI object
     */
    constructor(globalOptions?: Options);
    /**
     * Getter for global options
     *
     * @returns {Options} global options
     */
    getGlobalOptions(): Options;
    /**
     * Sets global API key
     *
     * @param {String} key
     */
    setKey(key: string): void;
    /**
     * Getter for global key
     *
     * @returns {String|undefined} global API key
     */
    getKey(): string | undefined;
    /**
     * Sets global language (Language must be listed [here](https://openweathermap.org/current#multi))
     *
     * @param {Language} lang - language
     */
    setLanguage(lang: Language): void;
    /**
     * Getter for global language
     *
     * @returns {Language|undefined} global language
     */
    getLanguage(): Language | undefined;
    /**
     * Sets global units
     *
     * @param {Unit} units - units (Only **standard**, **metric** or **imperial** are supported)
     */
    setUnits(units: Unit): void;
    /**
     * Getter for global units
     *
     * @returns {Unit|undefined} global units
     */
    getUnits(): Unit | undefined;
    /**
     * Sets global location by provided name
     *
     * @param {String} name - name of the location (`q` parameter [here](https://openweathermap.org/api/geocoding-api#direct_name))
     */
    setLocationByName(name: string): void;
    /**
     * Sets global location by provided coordinates
     *
     * @param {Number} lat - latitude of the location
     * @param {Number} lon - longitude of the location
     */
    setLocationByCoordinates(lat: number, lon: number): void;
    /**
     * Sets global location by provided zip/post code
     *
     * @param {String} zipCode - zip/post code and country code divided by comma (`zip` parameter [here](https://openweathermap.org/api/geocoding-api#direct_zip))
     */
    setLocationByZipCode(zipCode: string): void;
    /**
     * Getter for location
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Location|null>} location
     */
    getLocation(options?: Options): Promise<Location | null>;
    /**
     * Getter for current weather
     *
     * @param {Options} options - options used only for this call
     * @returns weather object of current weather
     */
    getCurrent(options?: Options): Promise<currentParser.CurrentWeather>;
    /**
     * Getter for minutely weather
     *
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next minute (Empty if API returned no info about minutely weather)
     */
    getMinutelyForecast(limit?: number, options?: Options): Promise<minutelyParser.MinutelyWeather>;
    /**
     * Getter for hourly weather
     *
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next hour (Empty if API returned no info about hourly weather)
     */
    getHourlyForecast(limit?: number, options?: Options): Promise<hourlyParser.HourlyWeather>;
    /**
     *
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Boolean} [includeToday=false] - boolean indicating whether to include today's weather in returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next day (Empty if API returned no info about daily weather)
     */
    getDailyForecast(limit?: number, includeToday?: boolean, options?: Options): Promise<dailyParser.DailyWeather>;
    /**
     * Getter for today's weather
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<dailyParser.DailyWeather>} weather object of today's weather **NOT the same as current!**
     */
    getToday(options?: Options): Promise<dailyParser.DailyWeather>;
    /**
     * @typedef {Object} Alert
     * @property {String} sender_name Name of the alert source. Please read here the full list of alert sources: https://openweathermap.org/api/one-call-api#listsource
     * @property {String} event Alert event name
     * @property {Number} start Date and time of the start of the alert, Unix, UTC
     * @property {Number} end Date and time of the end of the alert, Unix, UTC
     * @property {String} description Description of the alert
     * @property {String[]} tags Type of severe weather
     */
    /**
     * Getter for alerts\
     * **Note:** some agencies provide the alert’s description only in a local language.
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Alert[]>} alerts
     */
    getAlerts(options?: Options): Promise<{
        /**
         * Name of the alert source. Please read here the full list of alert sources: https://openweathermap.org/api/one-call-api#listsource
         */
        sender_name: string;
        /**
         * Alert event name
         */
        event: string;
        /**
         * Date and time of the start of the alert, Unix, UTC
         */
        start: number;
        /**
         * Date and time of the end of the alert, Unix, UTC
         */
        end: number;
        /**
         * Description of the alert
         */
        description: string;
        /**
         * Type of severe weather
         */
        tags: string[];
    }[]>;
    /**
     * Getter for every type of weather call and alerts
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<{
     *  lat: Number,
     *  lon: Number,
     *  timezone: String,
     *  timezone_offset: Number,
     *  current: currentParser.CurrentWeather,
     *  minutely: minutelyParser.MinutelyWeather,
     *  hourly: hourlyParser.HourlyWeather,
     *  daily: dailyParser.DailyWeather,
     *  alerts: Alert[]
     * }>} object that contains everything
     */
    getEverything(options?: Options): Promise<{
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: currentParser.CurrentWeather;
        minutely: minutelyParser.MinutelyWeather;
        hourly: hourlyParser.HourlyWeather;
        daily: dailyParser.DailyWeather;
        alerts: {
            /**
             * Name of the alert source. Please read here the full list of alert sources: https://openweathermap.org/api/one-call-api#listsource
             */
            sender_name: string;
            /**
             * Alert event name
             */
            event: string;
            /**
             * Date and time of the start of the alert, Unix, UTC
             */
            start: number;
            /**
             * Date and time of the end of the alert, Unix, UTC
             */
            end: number;
            /**
             * Description of the alert
             */
            description: string;
            /**
             * Type of severe weather
             */
            tags: string[];
        }[];
    }>;
    /**
     * Getter for historical data about weather
     *
     * @param {Date|Number|String} dt - Date from the **previous five days** (Unix time, UTC time zone)
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<{
     *  lat: Number,
     *  lon: Number,
     *  timezone: String,
     *  timezone_offset: Number,
     *  current: currentParser.CurrentWeather,
     *  hourly: hourlyParser.HourlyWeather
     * }>}
     */
    getHistory(dt: Date | number | string, options?: Options): Promise<{
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: currentParser.CurrentWeather;
        hourly: hourlyParser.HourlyWeather;
    }>;
    /**
     * Merges weather objects
     *
     * @param {Array} weathers - array of weather objects that you want to merge
     * @returns merged object of weather provided in weathers parameter
     */
    mergeWeathers(weathers: any[]): any;
    /**
     * Getter for current data about air pollution
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns Air Pollution Object with data about current pollution
     */
    getCurrentAirPollution(options?: Options): Promise<import("./models/airpollution-model").AirPollution>;
    /**
     * Getter for future data about air pollution
     *
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns Array of Air Pollution Objects with data about future pollution
     */
    getForecastedAirPollution(limit?: number, options?: Options): Promise<import("./models/airpollution-model").AirPollution[]>;
    /**
     * Getter for historical data about air pollution
     * WARNING: Historical data is accessible from 27th November 2020
     *
     * @param {Date|Number|String} from - Start date (unix time, UTC time zone)
     * @param {Date|Number|String} to - End date (unix time, UTC time zone)
     * @param {Options} [options={}] - options used only for this call
     * @returns Array of Air Pollution Objects with data about historical pollution
     */
    getHistoryAirPollution(from: Date | number | string, to: Date | number | string, options?: Options): Promise<import("./models/airpollution-model").AirPollution[]>;
    #private;
}
declare namespace OpenWeatherAPI {
    export { Language, Unit, Coordinates, Options, Location };
}
type Options = {
    key?: string;
    lang?: Language;
    units?: string;
    coordinates?: Coordinates;
    locationName?: string;
    zipCode?: string;
};
type Language = "af" | "al" | "ar" | "az" | "bg" | "ca" | "cz" | "da" | "de" | "el" | "en" | "eu" | "fa" | "fi" | "fr" | "gl" | "he" | "hi" | "hr" | "hu" | "id" | "it" | "ja" | "kr" | "la" | "lt" | "mk" | "no" | "nl" | "pl" | "pt" | "pt_br" | "ro" | "ru" | "sv" | "se" | "sk" | "sl" | "sp" | "es" | "sr" | "th" | "tr" | "ua" | "uk" | "vi" | "zh_cn" | "zh_tw" | "zu";
type Unit = "standard" | "metric" | "imperial";
type Location = {
    /**
     * Name of the found location
     */
    name: string;
    /**
     * * local_names.[language code] - Name of the found location in different languages. The list of names can be different for different locations
     * * local_names.ascii - Internal field
     * * local_names.feature_name - Internal field
     */
    local_names: any;
    /**
     * Geographical coordinates of the found location (latitude)
     */
    lat: number;
    /**
     * Geographical coordinates of the found location (longitude)
     */
    lon: number;
    /**
     * Geographical coordinates of the found location (longitude)
     */
    country: string;
    /**
     * State of the found location (where available)
     */
    state: string | undefined;
};
import currentParser = require("./parsers/weather/current-parser");
import minutelyParser = require("./parsers/weather/minutely-parser");
import hourlyParser = require("./parsers/weather/hourly-parser");
import dailyParser = require("./parsers/weather/daily-parser");
type Coordinates = {
    lat: number;
    lon: number;
};
