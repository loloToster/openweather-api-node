export = getWeatherModel;
/**
 * @typedef {Object} Astronomical
 * @property {Date} sunrise Sunrise time, Unix, UTC
 * @property {Number} sunrise_raw
 * @property {Date} sunset Sunset time, Unix, UTC
 * @property {Number} sunset_raw
 * @property {Date} moonrise The time of when the moon rises for this day, Unix, UTC
 * @property {Number} moonrise_raw
 * @property {Date} moonset The time of when the moon sets for this day, Unix, UTC
 * @property {Number} moonset_raw
 * @property {Number} moon_phase Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
 */
/**
 * @typedef {Object} Temperatures
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 * @property {Number} morn Morning temperature
 * @property {Number} day Day temperature
 * @property {Number} eve Evening temperature
 * @property {Number} night Night temperature
 * @property {Number} min Lowest daily temperature
 * @property {Number} max Highest daily temperature
 */
/**
 * @typedef {Object} FeelsLike
 * @property {Number} cur Current temperature or estimated temperature (in hourly forecast)
 * @property {Number} morn Morning temperature
 * @property {Number} day Day temperature
 * @property {Number} eve Evening temperature
 * @property {Number} night Night temperature
 */
/**
 * @typedef {Object} WindData
 * @property {Number} speed Wind speed
 * @property {Number} gust Wind gust
 * @property {Number} deg Wind direction, degrees (meteorological)
 */
/**
 * @typedef {Object} Icon
 * @property {String} url Weather icon url
 * @property {String} raw Weather icon id
 */
/**
 * @typedef {Object} Conditions
 * @property {Temperatures} temp Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {FeelsLike} feels_like This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} pressure Atmospheric pressure on the sea level, hPa
 * @property {Number} humidity Humidity, %
 * @property {Number} dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
 * @property {Number} clouds Cloudiness, %
 * @property {Number} uvi The maximum value of UV index for the day
 * @property {Number} visibility Average visibility, metres
 * @property {WindData} wind Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
 * @property {Number} pop Probability of precipitation
 * @property {Number} rain Precipitation volume, mm
 * @property {Number} snow Snow volume, mm
 * @property {Number} condition_id Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
 * @property {String} main Group of weather parameters (Rain, Snow, Extreme etc.)
 * @property {String} description Description of the weather
 * @property {Icon} icon
 */
/**
 * @typedef {Object} Weather
 * @property {Number} lat Geographical coordinates of the location (latitude)
 * @property {Number} lon Geographical coordinates of the location (longitude)
 * @property {Date} dt Date and time, UTC
 * @property {Number} dt_raw Date and time, Unix, UTC
 * @property {String} timezone Date and time, Unix, UTC
 * @property {Number} timezone_offset Date and time, Unix, UTC
 * @property {Astronomical} astronomical
 * @property {Conditions} weather
 */
/**
 * @returns {Weather}
 */
declare function getWeatherModel(): Weather;
declare namespace getWeatherModel {
    export { Astronomical, Temperatures, FeelsLike, WindData, Icon, Conditions, Weather };
}
type Weather = {
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
    astronomical: Astronomical;
    weather: Conditions;
};
type Astronomical = {
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
    /**
     * The time of when the moon rises for this day, Unix, UTC
     */
    moonrise: Date;
    moonrise_raw: number;
    /**
     * The time of when the moon sets for this day, Unix, UTC
     */
    moonset: Date;
    moonset_raw: number;
    /**
     * Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
     */
    moon_phase: number;
};
type Temperatures = {
    /**
     * Current temperature or estimated temperature (in hourly forecast)
     */
    cur: number;
    /**
     * Morning temperature
     */
    morn: number;
    /**
     * Day temperature
     */
    day: number;
    /**
     * Evening temperature
     */
    eve: number;
    /**
     * Night temperature
     */
    night: number;
    /**
     * Lowest daily temperature
     */
    min: number;
    /**
     * Highest daily temperature
     */
    max: number;
};
type FeelsLike = {
    /**
     * Current temperature or estimated temperature (in hourly forecast)
     */
    cur: number;
    /**
     * Morning temperature
     */
    morn: number;
    /**
     * Day temperature
     */
    day: number;
    /**
     * Evening temperature
     */
    eve: number;
    /**
     * Night temperature
     */
    night: number;
};
type WindData = {
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
type Icon = {
    /**
     * Weather icon url
     */
    url: string;
    /**
     * Weather icon id
     */
    raw: string;
};
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
    wind: WindData;
    /**
     * Probability of precipitation
     */
    pop: number;
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
    icon: Icon;
};
