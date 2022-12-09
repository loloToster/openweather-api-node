import { SUP_LANGS, SUP_UNITS } from "../constants";

export * from "./weather/index";
export * from "./air-pollution";

export type Language = typeof SUP_LANGS[number];

export type Unit = typeof SUP_UNITS[number];
