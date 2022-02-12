export = OpenWeatherAPI;
/**
 * @typedef {Object} Coordinates
 * @property {Number} [lat]
 * @property {Number} [lon]
 */
/**
 * @typedef {Object} Options
 * @property {String} [key]
 * @property {Language} [lang]
 * @property {String} [units]
 * @property {Coordinates} [coordinates]
 * @property {Unit} [units]
 * @property {String} [locationName]
 * @property {String} [zipCode]
 */
/**
 * @typedef {Object} Location
 * @property {String} name Name of the found location
 * @property {Object} local_names
 * * local_names.[language code] - Name of the found location in different languages. The list of names can be different for different locations
 * * local_names.ascii - Internal field
 * * local_names.feature_name - Internal field
 * @property {Number} lat Geographical coordinates of the found location (latitude)
 * @property {Number} lon Geographical coordinates of the found location (longitude)
 * @property {String} country Country of the found location
 * @property {String|undefined} state State of the found location (where available)
 */
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
 * @typedef {import("./parsers/weather/current-parser").CurrentWeather} CurrentWeather
 * @typedef {import("./parsers/weather/minutely-parser").MinutelyWeather} MinutelyWeather
 * @typedef {import("./parsers/weather/hourly-parser").HourlyWeather} HourlyWeather
 * @typedef {import("./parsers/weather/daily-parser").DailyWeather} DailyWeather
 */
/**
 * @typedef {Partial<import("./models/weather-model").Astronomical>} Astronomical
 * @typedef {Partial<import("./models/weather-model").Temperatures>} Temperatures
 * @typedef {Partial<import("./models/weather-model").FeelsLike>} FeelsLike
 * @typedef {Partial<import("./models/weather-model").WindData>} WindData
 * @typedef {Partial<import("./models/weather-model").Icon>} Icon
 */
/**
 * @typedef {Object} Conditions
 * @property {Temperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {FeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} [pressure] Atmospheric pressure on the sea level, hPa
 * @property {Number} [humidity] Humidity, %
 * @property {Number} [dew_point] Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} [clouds] Cloudiness, %
 * @property {Number} [uvi] The maximum value of UV index for the day
 * @property {Number} [visibility] Average visibility, metres
 * @property {WindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} [pop] Probability of precipitation
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} [snow] Snow volume, mm
 * @property {Number} [condition_id] Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} [main] Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} [description] Description of the weather
 * @property {Icon} icon
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
     * Getter for locations from query
     *
     * @param {String} query - query used to search the locations (`q` parameter [here](https://openweathermap.org/api/geocoding-api#direct_name))
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Location[]>} all found locations
     */
    getAllLocations(query: string, options?: Options): Promise<Location[]>;
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
    getMinutelyForecast(limit?: number, options?: Options): Promise<minutelyParser.MinutelyWeather[]>;
    /**
     * Getter for hourly weather
     *
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next hour (Empty if API returned no info about hourly weather)
     */
    getHourlyForecast(limit?: number, options?: Options): Promise<hourlyParser.HourlyWeather[]>;
    /**
     *
     * @param {Number} [limit=Number.POSITIVE_INFINITY] - maximum length of returned array
     * @param {Boolean} [includeToday=false] - boolean indicating whether to include today's weather in returned array
     * @param {Options} [options={}] - options used only for this call
     * @returns array of Weather objects, one for every next day (Empty if API returned no info about daily weather)
     */
    getDailyForecast(limit?: number, includeToday?: boolean, options?: Options): Promise<dailyParser.DailyWeather[]>;
    /**
     * Getter for today's weather
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<dailyParser.DailyWeather>} weather object of today's weather **NOT the same as current!**
     */
    getToday(options?: Options): Promise<dailyParser.DailyWeather>;
    /**
     * Getter for alerts\
     * **Note:** some agencies provide the alert’s description only in a local language.
     *
     * @param {Options} [options={}] - options used only for this call
     * @returns {Promise<Alert[]>} alerts
     */
    getAlerts(options?: Options): Promise<Alert[]>;
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
     *  minutely: minutelyParser.MinutelyWeather[],
     *  hourly: hourlyParser.HourlyWeather[],
     *  daily: dailyParser.DailyWeather[],
     *  alerts: Alert[]
     * }>} object that contains everything
     */
    getEverything(options?: Options): Promise<{
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: currentParser.CurrentWeather;
        minutely: minutelyParser.MinutelyWeather[];
        hourly: hourlyParser.HourlyWeather[];
        daily: dailyParser.DailyWeather[];
        alerts: Alert[];
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
     *  hourly: hourlyParser.HourlyWeather[]
     * }>}
     */
    getHistory(dt: Date | number | string, options?: Options): Promise<{
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: currentParser.CurrentWeather;
        hourly: hourlyParser.HourlyWeather[];
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
    export { Language, Unit, Coordinates, Options, Location, Alert, CurrentWeather, MinutelyWeather, HourlyWeather, DailyWeather, Astronomical, Temperatures, FeelsLike, WindData, Icon, Conditions };
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
     * Country of the found location
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
type DailyWeather = import("./parsers/weather/daily-parser").DailyWeather;
type Alert = {
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
};
type CurrentWeather = import("./parsers/weather/current-parser").CurrentWeather;
type MinutelyWeather = import("./parsers/weather/minutely-parser").MinutelyWeather;
type HourlyWeather = import("./parsers/weather/hourly-parser").HourlyWeather;
type Coordinates = {
    lat?: number;
    lon?: number;
};
type Astronomical = Partial<import("./models/weather-model").Astronomical>;
type Temperatures = Partial<import("./models/weather-model").Temperatures>;
type FeelsLike = Partial<import("./models/weather-model").FeelsLike>;
type WindData = Partial<import("./models/weather-model").WindData>;
type Icon = Partial<import("./models/weather-model").Icon>;
type Conditions = {
    /**
     * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    temp: Temperatures;
    /**
     * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    feels_like: FeelsLike;
    /**
     * Atmospheric pressure on the sea level, hPa
     */
    pressure?: number;
    /**
     * Humidity, %
     */
    humidity?: number;
    /**
     * Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    dew_point?: number;
    /**
     * Cloudiness, %
     */
    clouds?: number;
    /**
     * The maximum value of UV index for the day
     */
    uvi?: number;
    /**
     * Average visibility, metres
     */
    visibility?: number;
    /**
     * Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
     */
    wind: WindData;
    /**
     * Probability of precipitation
     */
    pop?: number;
    /**
     * Precipitation volume, mm
     */
    rain: number;
    /**
     * Snow volume, mm
     */
    snow?: number;
    /**
     * Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
     */
    condition_id?: number;
    /**
     * Group of weather parameters (Rain, Snow, Extreme etc.)
     */
    main?: string;
    /**
     * Description of the weather
     */
    description?: string;
    icon: Icon;
};
