import { get } from "./request";

import currentParser from "./parsers/weather/current-parser";
import forecastParser from "./parsers/weather/forecast-parser";

import onecallCurrentParser from "./parsers/onecall/current-parser";
import onecallMinutelyParser from "./parsers/onecall/minutely-parser";
import onecallHourlyParser from "./parsers/onecall/hourly-parser";
import onecallDailyParser from "./parsers/onecall/daily-parser";
import onecallHistoricalParser from "./parsers/onecall/history-parser";

import singleAirPollutionParser from "./parsers/air-pollution/single-parser";
import listAirPollutionParser from "./parsers/air-pollution/list-parser";

import {
  AIR_POLLUTION_PATH,
  API_ENDPOINT,
  FORECAST_PATH,
  GEO_PATH,
  ONECALL_PATH,
  SUP_LANGS,
  SUP_UNITS,
  WEATHER_PATH,
} from "./constants";

import {
  Alert,
  Language,
  Location,
  Options,
  Unit,
  Coordinates,
  CurrentWeather,
  MinutelyWeather,
  HourlyWeather,
  DailyWeather,
  HistoricalWeather,
  Everything,
  AirPollution,
  ForecastWeather,
} from "./types";

function isObject<T = Record<string, unknown>>(x: unknown): x is T {
  return Boolean(x) && typeof x === "object" && !Array.isArray(x);
}

// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeObj<T>(target: T, ...sources: T[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeObj(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeObj(target, ...sources);
}

export class OpenWeatherAPI {
  private globalOptions: Options;

  /**
   * Constructor of the class. You can specify global options here
   *
   * @constructor
   * @param globalOptions - object that defines global options
   * @returns OpenWeatherAPI object
   */
  constructor(globalOptions: Options = {}) {
    if (!isObject(globalOptions))
      throw new Error("Provide {} object as options");

    this.globalOptions = {};

    const go = globalOptions as any;

    for (const key in go) {
      if (Object.hasOwnProperty.call(go, key)) {
        const value = go[key];

        switch (key as keyof Options) {
          case "key":
            this.setKey(value);
            break;

          // @ts-ignore: Type '"language"' is not comparable to type 'keyof Options'.
          case "language":
          case "lang":
            this.setLanguage(value);
            break;

          case "units":
            this.setUnits(value);
            break;

          case "locationName":
            this.setLocationByName(value);
            break;

          case "coordinates":
            this.setLocationByCoordinates(value.lat, value.lon);
            break;

          case "zipCode":
            this.setLocationByZipCode(value);
            break;

          default:
            throw new Error("Unknown parameter: " + key);
        }
      }
    }
  }

  /**
   * Sets global API key
   *
   * @param key - api key
   */
  setKey(key: string) {
    if (!key) throw new Error("Empty value cannot be a key: " + key);
    this.globalOptions.key = key;
  }

  /**
   * Getter for global key
   *
   * @returns global API key
   */
  getKey() {
    return this.globalOptions.key;
  }

  /**
   * Sets global language (Language must be listed [here](https://openweathermap.org/current#multi))
   *
   * @param lang - language
   */
  setLanguage(lang: Language) {
    this.globalOptions.lang = this.evaluateLanguage(lang);
  }

  /**
   * Getter for global language
   *
   * @return global language
   */
  getLanguage(): Language | undefined {
    return this.globalOptions.lang;
  }

  private evaluateLanguage(lang: unknown) {
    if (typeof lang !== "string")
      throw new Error("language needs to be a string");

    const loweredLang = lang.toLowerCase();
    if (SUP_LANGS.includes(loweredLang as any)) return loweredLang as Language;
    else throw new Error("Unsupported language: " + loweredLang);
  }

  /**
   * Sets global units
   *
   * @param units - units (Only **standard**, **metric** or **imperial** are supported)
   */
  setUnits(units: Unit) {
    this.globalOptions.units = this.evaluateUnits(units);
  }

  /**
   * Getter for global units
   *
   * @returns global units
   */
  getUnits(): Unit | undefined {
    return this.globalOptions.units;
  }

  private evaluateUnits(units: unknown) {
    if (typeof units !== "string")
      throw new Error("units needs to be a string");

    const loweredUnits = units.toLowerCase();
    if (SUP_UNITS.includes(loweredUnits as any)) return loweredUnits as Unit;
    else throw new Error("Unsupported units: " + loweredUnits);
  }

  /**
   * Sets global location by provided name
   *
   * @param name - name of the location (`q` parameter [here](https://openweathermap.org/api/geocoding-api#direct_name))
   */
  setLocationByName(name: string) {
    if (!name)
      throw new Error("Empty value cannot be a location name: " + name);

    this.globalOptions.coordinates = undefined;
    this.globalOptions.zipCode = undefined;
    this.globalOptions.locationName = name;
  }

  private async evaluateLocationByName(name: unknown, key: string) {
    if (typeof name !== "string")
      throw new Error("name of the location needs to be a string");

    let response = await this.fetch(
      `${API_ENDPOINT}${GEO_PATH}direct?q=${encodeURIComponent(
        name
      )}&limit=1&appid=${encodeURIComponent(key)}`
    );

    let data = response.data;
    if (data.length == 0) throw new Error("Unknown location name: " + name);
    data = response.data[0];

    return {
      lat: data.lat,
      lon: data.lon,
    };
  }

  /**
   * Sets global location by provided coordinates
   *
   * @param lat - latitude of the location
   * @param lon - longitude of the location
   */
  setLocationByCoordinates(lat: number, lon: number) {
    let location = this.evaluateLocationByCoordinates({ lat, lon });
    this.globalOptions.locationName = undefined;
    this.globalOptions.zipCode = undefined;

    this.globalOptions.coordinates = { lat: location.lat, lon: location.lon };
  }

  private evaluateLocationByCoordinates(coords: unknown): Coordinates {
    if (
      !isObject(coords) ||
      typeof coords.lat !== "number" ||
      typeof coords.lon !== "number"
    )
      throw new Error("Invalid Coordinates");

    const { lat, lon } = coords;

    if (-90 <= lat && lat <= 90 && -180 <= lon && lon <= 180) {
      return { lat, lon };
    } else {
      throw new Error(
        "Invalid Coordinates: lat must be between -90 & 90 and lon must be between -180 & 180"
      );
    }
  }

  /**
   * Sets global location by provided zip/post code
   *
   * @param zipCode - zip/post code and country code divided by comma (`zip` parameter [here](https://openweathermap.org/api/geocoding-api#direct_zip))
   */
  setLocationByZipCode(zipCode: string) {
    if (!zipCode)
      throw new Error("Empty value cannot be a location zip code: " + zipCode);

    this.globalOptions.coordinates = undefined;
    this.globalOptions.locationName = undefined;
    this.globalOptions.zipCode = zipCode;
  }

  private async evaluateLocationByZipCode(zipCode: unknown, key: string) {
    if (typeof zipCode !== "string")
      throw new Error("zip code needs to be a string");

    let response = await this.fetch(
      `${API_ENDPOINT}${GEO_PATH}zip?zip=${encodeURIComponent(
        zipCode
      )}&appid=${encodeURIComponent(key)}`
    );

    let data = response.data;

    return {
      lat: data.lat,
      lon: data.lon,
    };
  }

  /**
   * Getter for location
   *
   * @param options - options used only for this call
   * @returns location or null for no location
   */
  async getLocation(options: Options = {}): Promise<Location | null> {
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      `${API_ENDPOINT}${GEO_PATH}reverse?lat=${
        parsedOptions.coordinates?.lat
      }&lon=${
        parsedOptions.coordinates?.lon
      }&limit=1&appid=${encodeURIComponent(parsedOptions.key || "")}`
    );

    let data = response.data;
    return data.length ? data[0] : null;
  }

  /**
   * Getter for locations from query
   *
   * @param query - query used to search the locations (`q` parameter [here](https://openweathermap.org/api/geocoding-api#direct_name))
   * @param options - options used only for this call
   * @returns all found locations
   */
  async getAllLocations(
    query: string,
    options: Options = {}
  ): Promise<Location[]> {
    if (!query) throw new Error("No query");

    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      `${API_ENDPOINT}${GEO_PATH}direct?q=${encodeURIComponent(
        query
      )}&limit=5&appid=${encodeURIComponent(parsedOptions.key || "")}`
    );

    let data = response.data;
    return data;
  }

  // Weather getters

  /**
   * Getter for current weather
   *
   * @param options - options used only for this call
   * @returns weather object of current weather
   */
  async getCurrent(options: Options = {}): Promise<CurrentWeather> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, WEATHER_PATH)
    );

    let data = response.data;
    return currentParser(data);
  }

  /**
   * Getter for forecasted weather
   *
   * @param limit - maximum length of returned array
   * @param options - options used only for this call
   * @returns array of Weather objects, one for every 3 hours, up to 5 days
   */
  async getForecast(
    limit: number = Number.POSITIVE_INFINITY,
    options: Options = {}
  ): Promise<ForecastWeather[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, FORECAST_PATH)
    );

    let data = response.data;
    return forecastParser(data, limit);
  }

  /**
   * Getter for minutely weather
   *
   * @param limit - maximum length of returned array
   * @param options - options used only for this call
   * @returns array of Weather objects, one for every next minute (Empty if API returned no info about minutely weather)
   */
  async getMinutelyForecast(
    limit: number = Number.POSITIVE_INFINITY,
    options: Options = {}
  ): Promise<MinutelyWeather[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, ONECALL_PATH, {
        exclude: "alerts,current,hourly,daily",
      })
    );

    let data = response.data;
    return onecallMinutelyParser(data, limit);
  }

  /**
   * Getter for hourly weather
   *
   * @param limit - maximum length of returned array
   * @param options - options used only for this call
   * @returns array of Weather objects, one for every next hour (Empty if API returned no info about hourly weather)
   */
  async getHourlyForecast(
    limit: number = Number.POSITIVE_INFINITY,
    options: Options = {}
  ): Promise<HourlyWeather[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, ONECALL_PATH, {
        exclude: "alerts,current,minutely,daily",
      })
    );

    let data = response.data;
    return onecallHourlyParser(data, limit);
  }

  /**
   * Getter for daily weather
   *
   * @param limit - maximum length of returned array
   * @param includeToday - boolean indicating whether to include today's weather in returned array
   * @param options - options used only for this call
   * @returns array of Weather objects, one for every next day (Empty if API returned no info about daily weather)
   */
  async getDailyForecast(
    limit: number = Number.POSITIVE_INFINITY,
    includeToday: boolean = false,
    options: Options = {}
  ): Promise<DailyWeather[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, ONECALL_PATH, {
        exclude: "alerts,current,minutely,hourly",
      })
    );

    let data = response.data;
    if (!includeToday) data.daily.shift();
    return onecallDailyParser(data, limit);
  }

  /**
   * Getter for today's weather
   *
   * @param options - options used only for this call
   * @returns weather object of today's weather **NOT the same as current!**
   */
  async getToday(options: Options = {}): Promise<DailyWeather> {
    return (await this.getDailyForecast(1, true, options))[0];
  }

  /**
   * Getter for alerts\
   * **Note:** some agencies provide the alert’s description only in a local language.
   *
   * @param options - options used only for this call
   * @returns alerts
   */
  async getAlerts(options: Options = {}): Promise<Alert[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, ONECALL_PATH, {
        exclude: "current,minutely,hourly,daily",
      })
    );

    let data = response.data;
    return data.alerts ?? [];
  }

  /**
   * Getter for every type of weather call and alerts
   *
   * @param options - options used only for this call
   * @returns object that contains everything
   */
  async getEverything(options: Options = {}): Promise<Everything> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, ONECALL_PATH)
    );

    let data = response.data;
    return {
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      timezoneOffset: data.timezone_offset,
      current: onecallCurrentParser(data),
      minutely: onecallMinutelyParser(data, Number.POSITIVE_INFINITY),
      hourly: onecallHourlyParser(data, Number.POSITIVE_INFINITY),
      daily: onecallDailyParser(data, Number.POSITIVE_INFINITY),
      alerts: data.alerts,
    };
  }

  /**
   * Getter for historical data about weather
   *
   * @param dt - Date from the **previous five days** (Unix time, UTC time zone)
   * @param options - options used only for this call
   */
  async getHistory(
    dt: Date | number | string,
    options: Options = {}
  ): Promise<HistoricalWeather> {
    if (dt === undefined) throw new Error("Provide time");

    await this.uncacheLocation();
    dt = Math.round(new Date(dt).getTime() / 1000);

    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, ONECALL_PATH + "/timemachine", {
        dt: dt.toString(),
      })
    );

    let data = response.data;
    return onecallHistoricalParser(data);
  }

  // Uncategorized Methods

  /**
   * Getter for current data about air pollution
   *
   * @param options - options used only for this call
   * @returns Air Pollution Object with data about current pollution
   */
  async getCurrentAirPollution(options: Options = {}): Promise<AirPollution> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, AIR_POLLUTION_PATH)
    );

    let data = response.data;
    return singleAirPollutionParser(data);
  }

  /**
   * Getter for future data about air pollution
   *
   * @param limit - maximum length of returned array
   * @param options - options used only for this call
   * @returns Array of Air Pollution Objects with data about future pollution
   */
  async getForecastedAirPollution(
    limit = Number.POSITIVE_INFINITY,
    options: Options = {}
  ): Promise<AirPollution[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, AIR_POLLUTION_PATH + "/forecast")
    );

    let data = response.data;
    return listAirPollutionParser(data, limit);
  }

  /**
   * Getter for historical data about air pollution
   * WARNING: Historical data is accessible from 27th November 2020
   *
   * @param from - Start date (unix time, UTC time zone)
   * @param to - End date (unix time, UTC time zone)
   * @param options - options used only for this call
   * @returns Array of Air Pollution Objects with data about historical pollution
   */
  async getHistoryAirPollution(
    from: Date | number | string,
    to: Date | number | string,
    options: Options = {}
  ): Promise<AirPollution[]> {
    await this.uncacheLocation();
    const parsedOptions = await this.parseOptions(options);

    let response = await this.fetch(
      this.createURL(parsedOptions, AIR_POLLUTION_PATH + "/history", {
        start: Math.round(new Date(from).getTime() / 1000).toString(),
        end: Math.round(new Date(to).getTime() / 1000).toString(),
      })
    );

    const data = response.data;
    return listAirPollutionParser(data, Number.POSITIVE_INFINITY);
  }

  // helpers
  private async uncacheLocation() {
    if (
      typeof this.globalOptions.coordinates?.lat == "number" &&
      typeof this.globalOptions.coordinates?.lon == "number"
    )
      return;

    const key = this.globalOptions.key;
    if (!key) return;

    try {
      if (this.globalOptions.locationName) {
        this.globalOptions.coordinates = await this.evaluateLocationByName(
          this.globalOptions.locationName,
          key
        );
      } else if (this.globalOptions.zipCode) {
        this.globalOptions.coordinates = await this.evaluateLocationByZipCode(
          this.globalOptions.zipCode,
          key
        );
      }
    } catch {}
  }

  private createURL(
    options: Options,
    path = "",
    additionalParams: Record<string, string> = {}
  ) {
    if (!options.key) throw new Error("Invalid key");
    if (!options.coordinates) throw new Error("Invalid coordinates");

    let url = new URL(path, API_ENDPOINT);

    url.searchParams.append("appid", options.key);
    url.searchParams.append("lat", options.coordinates.lat.toString());
    url.searchParams.append("lon", options.coordinates.lon.toString());

    if (options.lang) url.searchParams.append("lang", options.lang);
    if (options.units) url.searchParams.append("units", options.units);

    for (const [key, value] of Object.entries(additionalParams)) {
      url.searchParams.append(key, value);
    }

    return url.href;
  }

  private async fetch(url: string) {
    const res = await get(url);
    const data = res.data;

    if (data.cod && parseInt(data.cod) !== 200) {
      throw new Error(JSON.stringify(data));
    } else {
      return res;
    }
  }

  private async parseOptions(options: Options): Promise<Options> {
    if (!isObject<Options>(options))
      throw new Error("Provide {} object as options");

    const parsedOptions: Options = {};

    for (const key in options) {
      if (Object.hasOwnProperty.call(options, key)) {
        const value = (options as Record<string, unknown>)[key];

        switch (key as keyof Options) {
          case "key": {
            if (typeof value !== "string")
              throw Error("key needs to be a string");

            parsedOptions.key = value;
            break;
          }

          // @ts-ignore: Type '"language"' is not comparable to type 'keyof Options'.
          case "language":
          case "lang": {
            parsedOptions.lang = this.evaluateLanguage(value);
            break;
          }

          case "units": {
            parsedOptions.units = this.evaluateUnits(value);
            break;
          }

          case "locationName": {
            parsedOptions.locationName = value as string;
            parsedOptions.coordinates = await this.evaluateLocationByName(
              value,
              options.key || this.globalOptions.key || ""
            );
            break;
          }

          case "coordinates": {
            parsedOptions.coordinates =
              this.evaluateLocationByCoordinates(value);

            break;
          }

          case "zipCode": {
            parsedOptions.zipCode = value as string;
            parsedOptions.coordinates = await this.evaluateLocationByZipCode(
              value,
              options.key || this.globalOptions.key || ""
            );
            break;
          }

          default: {
            throw new Error("Unknown parameter: " + key);
          }
        }
      }
    }

    return mergeObj({}, this.globalOptions, parsedOptions);
  }
}

export default OpenWeatherAPI;
export * from "./types";
