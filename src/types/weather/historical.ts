import { Icon, WeatherBase, WindData } from "./index";

export interface HistoricalTemperatures {
  /**
   * The temperature in that point in time
   */
  cur: number;
}

export interface HistoricalConditions {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: HistoricalTemperatures;
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feelsLike: HistoricalTemperatures;
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
  dewPoint: number | undefined;
  /**
   * Cloudiness, %
   */
  clouds: number;
  /**
   * The maximum value of UV index for the day
   */
  uvi: number | undefined;
  /**
   * Average visibility, metres
   */
  visibility: number;
  /**
   * Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
   */
  wind: WindData;
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

export interface HistoricalAstronomical {
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

export interface HistoricalWeather extends WeatherBase {
  astronomical: HistoricalAstronomical;
  weather: HistoricalConditions;
}
