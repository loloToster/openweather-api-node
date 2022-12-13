import { CurrentWeather } from "./current";
import { MinutelyWeather } from "./minutely";
import { HourlyWeather } from "./hourly";
import { DailyWeather } from "./daily";

export * from "./current";
export * from "./minutely";
export * from "./hourly";
export * from "./daily";

export interface Alert {
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
}

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

export interface Everything {
  lat: number;
  lon: number;
  timezone: string;
  timezoneOffset: number;
  current: CurrentWeather;
  minutely: MinutelyWeather[];
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  alerts: Alert[];
}

export interface WeatherHistory {
  lat: number;
  lon: number;
  timezone: string;
  timezoneOffset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
}
