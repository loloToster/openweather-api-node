export interface Components {
  /**
   * Сoncentration of CO (Carbon monoxide), μg/m3
   */
  co: number;
  /**
   * Сoncentration of NO (Nitrogen monoxide), μg/m3
   */
  no: number;
  /**
   * Сoncentration of NO2 (Nitrogen dioxide), μg/m3
   */
  no2: number;
  /**
   * Сoncentration of O3 (Ozone), μg/m3
   */
  o3: number;
  /**
   * Сoncentration of SO2 (Sulphur dioxide), μg/m3
   */
  so2: number;
  /**
   * Сoncentration of PM2.5 (Fine particles matter), μg/m3
   */
  pm2_5: number;
  /**
   * Сoncentration of PM10 (Coarse particulate matter), μg/m3
   */
  pm10: number;
  /**
   * Сoncentration of NH3 (Ammonia), μg/m3
   */
  nh3: number;
}

export interface AirPollution {
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
   * Air Quality Index.
   */
  aqi: number;
  /**
   * String substitute of aqi field (only english)
   */
  aqiName: string;
  components: Components;
}
