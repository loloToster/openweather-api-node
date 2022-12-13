import { WeatherBase } from "./index";

export interface MinutelyConditions {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: {};
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feelsLike: {};
  /**
   * Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
   */
  wind: {};
  /**
   * Precipitation volume, mm
   */
  rain: number;
  icon: {};
}

export interface MinutelyWeather extends WeatherBase {
  astronomical: {};
  weather: MinutelyConditions;
}
