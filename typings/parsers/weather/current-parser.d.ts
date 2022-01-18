export = currentParser;
/**
 * @typedef {Object} CurrentAstronomical
 * @property {Date} sunrise Sunrise time, Unix, UTC
 * @property {Number} sunrise_raw
 * @property {Date} sunset Sunset time, Unix, UTC
 * @property {Number} sunset_raw
 */
/**
 * @typedef {Object} CurrentTemperatures
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 */
/**
 * @typedef {Object} CurrentFeelsLike
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 */
/**
 * @typedef {Object} CurrentWindData
 * @property {Number} speed Wind speed
 * @property {Number} gust Wind gust
 * @property {Number} deg Wind direction, degrees (meteorological)
 */
/**
 * @typedef {Object} CurrentIcon
 * @property {String} url Weather icon url
 * @property {String} raw Weather icon id
 */
/**
 * @typedef {Object} CurrentConditions
 * @property {CurrentTemperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {CurrentFeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} pressure Atmospheric pressure on the sea level, hPa
 * @property {Number} humidity Humidity, %
 * @property {Number} dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} clouds Cloudiness, %
 * @property {Number} uvi The maximum value of UV index for the day
 * @property {Number} visibility Average visibility, metres
 * @property {CurrentWindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} snow Snow volume, mm
 * @property {Number} condition_id Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} main Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} description Description of the weather
 * @property {CurrentIcon} icon
 */
/**
 * @typedef {Object} CurrentWeather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {CurrentAstronomical} astronomical
 * @property {CurrentConditions} weather
 */
/**
 * @returns {CurrentWeather}
 */
declare function currentParser(data: any): CurrentWeather;
declare namespace currentParser {
    export { CurrentAstronomical, CurrentTemperatures, CurrentFeelsLike, CurrentWindData, CurrentIcon, CurrentConditions, CurrentWeather };
}
type CurrentWeather = {
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
    astronomical: CurrentAstronomical;
    weather: CurrentConditions;
};
type CurrentAstronomical = {
    /**
     * Sunrise time, Unix, UTC
     */
    sunrise: Date;
    sunrise_raw: number;
    /**
     * Sunset time, Unix, UTC
     */
    sunset: Date;
    sunset_raw: number;
};
type CurrentTemperatures = {
    /**
     * Current temperature or estimated temperature (in hourly forecast)
     */
    cur: number;
};
type CurrentFeelsLike = {
    /**
     * Current temperature or estimated temperature (in hourly forecast)
     */
    cur: number;
};
type CurrentWindData = {
    /**
     * Wind speed
     */
    speed: number;
    /**
     * Wind gust
     */
    gust: number;
    /**
     * Wind direction, degrees (meteorological)
     */
    deg: number;
};
type CurrentIcon = {
    /**
     * Weather icon url
     */
    url: string;
    /**
     * Weather icon id
     */
    raw: string;
};
type CurrentConditions = {
    /**
     * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    temp: CurrentTemperatures;
    /**
     * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    feels_like: CurrentFeelsLike;
    /**
     * Atmospheric pressure on the sea level, hPa
     */
    pressure: number;
    /**
     * Humidity, %
     */
    humidity: number;
    /**
     * Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
     */
    dew_point: number;
    /**
     * Cloudiness, %
     */
    clouds: number;
    /**
     * The maximum value of UV index for the day
     */
    uvi: number;
    /**
     * Average visibility, metres
     */
    visibility: number;
    /**
     * Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
     */
    wind: CurrentWindData;
    /**
     * Precipitation volume, mm
     */
    rain: number;
    /**
     * Snow volume, mm
     */
    snow: number;
    /**
     * Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
     */
    condition_id: number;
    /**
     * Group of weather parameters (Rain, Snow, Extreme etc.)
     */
    main: string;
    /**
     * Description of the weather
     */
    description: string;
    icon: CurrentIcon;
};
