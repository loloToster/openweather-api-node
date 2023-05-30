import { Icon, WeatherBase, WindData } from "./index";

export interface DailyTemperatures {
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
}

export interface DailyFeelsLike {
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
}

export interface DailyConditions {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: DailyTemperatures;
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feelsLike: DailyFeelsLike;
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
  dewPoint: number;
  /**
   * Cloudiness, %
   */
  clouds: number;
  /**
   * The maximum value of UV index for the day
   */
  uvi: number;
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
  conditionId: number;
  /**
   * Group of weather parameters (Rain, Snow, Extreme etc.)
   */
  main: string;
  /**
   * Description of the weather
   */
  description: string;
  /**
   * Human-readable text description of the daily forecast
   */
  summary: string;
  icon: Icon;
}

export interface DailyAstronomical {
  /**
   * Sunrise time, Unix, UTC
   */
  sunrise: Date;
  sunriseRaw: number;
  /**
   * Sunset time, Unix, UTC
   */
  sunset: Date;
  sunsetRaw: number;
  /**
   * The time of when the moon rises for this day, Unix, UTC
   */
  moonrise: Date;
  moonriseRaw: number;
  /**
   * The time of when the moon sets for this day, Unix, UTC
   */
  moonset: Date;
  moonsetRaw: number;
  /**
   * Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
   */
  moonPhase: number;
}

export interface DailyWeather extends WeatherBase {
  astronomical: DailyAstronomical;
  weather: DailyConditions;
}
