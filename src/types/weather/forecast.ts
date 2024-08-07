import { Icon, WeatherBase, WindData } from "./index";

export interface ForecastTemperatures {
  /**
   * Estimated temperature
   */
  cur: number;
}

export interface ForecastConditions {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: ForecastTemperatures;
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feelsLike: ForecastTemperatures;
  /**
   * Minimum temperature
   * 
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  tempMin: number;
  /**
   * Maximum temperature
   * 
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  tempMax: number;
  /**
   * Atmospheric pressure on the sea level, hPa
   */
  pressure: number;
  /**
   * Humidity, %
   */
  humidity: number;
  /**
   * Cloudiness, %
   */
  clouds: number;
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

export interface ForecastAstronomical {
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
}

export interface ForecastWeather extends WeatherBase {
  astronomical: ForecastAstronomical;
  weather: ForecastConditions;
}
