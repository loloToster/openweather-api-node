import { SUP_LANGS, SUP_UNITS } from "../constants";

export type Language = typeof SUP_LANGS[number];

export type Unit = typeof SUP_UNITS[number];

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Options {
  key?: string;
  lang?: Language;
  units?: Unit;
  coordinates?: Coordinates;
  locationName?: string;
  zipCode?: string;
}
