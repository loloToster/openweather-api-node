export const SUP_LANGS = [
  "af",
  "al",
  "ar",
  "az",
  "bg",
  "ca",
  "cz",
  "da",
  "de",
  "el",
  "en",
  "eu",
  "fa",
  "fi",
  "fr",
  "gl",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kr",
  "la",
  "lt",
  "mk",
  "no",
  "nl",
  "pl",
  "pt",
  "pt_br",
  "ro",
  "ru",
  "sv",
  "se",
  "sk",
  "sl",
  "sp",
  "es",
  "sr",
  "th",
  "tr",
  "ua",
  "uk",
  "vi",
  "zh_cn",
  "zh_tw",
  "zu",
] as const;

export const SUP_UNITS = ["standard", "metric", "imperial"] as const;

export const API_ENDPOINT = "https://api.openweathermap.org/";

export const GEO_PATH = "geo/1.0/";
export const DATA_PATH = "data/2.5";
export const DATA_3_PATH = "data/3.0";

export const WEATHER_PATH = DATA_PATH + "/weather";
export const FORECAST_PATH = DATA_PATH + "/forecast";
export const ONECALL_PATH = DATA_3_PATH + "/onecall";
export const AIR_POLLUTION_PATH = DATA_PATH + "/air_pollution";
