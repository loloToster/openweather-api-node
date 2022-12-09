import { CurrentWeather } from "./current";
import { MinutelyWeather } from "./minutely";
import { HourlyWeather } from "./hourly";
import { DailyWeather } from "./daily";

export * from "./current";
export * from "./minutely";
export * from "./hourly";
export * from "./daily";

export interface WindData {
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
}

export interface Icon {
  url: string;
  raw: string;
}

export interface WeatherBase {
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
  dtRaw: number;
  /**
   * Date and time, Unix, UTC
   */
  timezone: string;
  /**
   * Date and time, Unix, UTC
   */
  timezoneOffset: number;
}

export type Weather = WeatherBase &
  CurrentWeather &
  MinutelyWeather &
  HourlyWeather &
  DailyWeather;
