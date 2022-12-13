import { Icon, WeatherBase, WindData } from "./index";

export interface HourlyTemperatures {
  /**
   * Estimated temperature (in hourly forecast)
   */
  cur: number;
}

export interface HourlyConditions {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: HourlyTemperatures;
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feelsLike: HourlyTemperatures;
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
  conditionId: number;
  /**
   * Group of weather parameters (Rain, Snow, Extreme etc.)
   */
  main: string;
  /**
   * Description of the weather
   */
  description: string;
  icon: Icon;
}

export interface HourlyWeather extends WeatherBase {
  astronomical: {};
  weather: HourlyConditions;
}
