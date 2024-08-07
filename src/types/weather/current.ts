import { Icon, WeatherBase, WindData } from "./index";

export interface CurrentTemperatures {
  /**
   * Current temperature
   */
  cur: number;
}

export interface CurrentConditions {
  /**
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  temp: CurrentTemperatures;
  /**
   * This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  feelsLike: CurrentTemperatures;
  /**
   * Current minimum temperature
   * 
   * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
   */
  tempMin: number;
  /**
   * Current maximum temperature
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

export interface CurrentAstronomical {
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

export interface CurrentWeather extends WeatherBase {
  astronomical: CurrentAstronomical;
  weather: CurrentConditions;
}
