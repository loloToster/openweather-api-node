<br>
<br>
<p align="center">
<img src="logo/logo.png" alt="logo" width="65%">
</p>
<br>
<p align="center">
Simple package that makes it easy to work with OpenWeather API.
</p>
<br>
<p align="center">
<a href="https://npmjs.org/package/openweather-api-node">
    <img src="https://img.shields.io/npm/v/openweather-api-node?style=flat-square" alt="Version">
</a>
<a href="https://npmjs.org/package/openweather-api-node">
    <img src="https://img.shields.io/npm/dt/openweather-api-node?style=flat-square" alt="Version">
</a>
<a href="https://github.com/loloToster/openweather-api-node/issues">
    <img src="https://img.shields.io/github/issues-raw/loloToster/openweather-api-node?style=flat-square" alt="Issues">
</a>
<a href="https://github.com/loloToster/openweather-api-node/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
</a>

</p>

# About

This package is a wrapper for OpenWeather API. If you want to learn how to use this package check out examples in *examples* folder. The only thing that you need to get started is API key if you don't have one go to [OpenWeatherMap website](https://openweathermap.org/) and get it. For now this package supports only a part of the API but we are planning on adding more features like: triggers, maps and all the other stuff that is available for free in OpenWeatherMap API.

Currently Supported APIs:
  * Weather (from OneCall) - get **current weather** and weather **forecast for up to 7 days**
  * Geocoding - get location **latitude and longitude from its name** and vice versa
  * Historical (from OneCall) - get weather from **previous 5 days**
  * Air pollution - get **current, forecasted and historical data about air pollution**

# Installation
```
npm i openweather-api-node
```

# Simple Example
## JS:
```js
const OpenWeatherAPI = require("openweather-api-node")

let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: "New York",
    units: "imperial"
})

/* 
you can use setters as well:
weather.setKey("put-key-here")
weather.setLocationByName("New York")
...
*/

weather.getCurrent().then(data => {
    console.log(`Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`)
})
```

## TS:
```ts
import OpenWeatherAPI from "openweather-api-node"
// or `import * as OpenWeatherAPI from "openweather-api-node"` 
// if there is no `"esModuleInterop": true` in tsconfig.json

let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: "New York",
    units: "imperial"
})

/* 
you can use setters as well:
weather.setKey("put-key-here")
weather.setLocationByName("New York")
...
*/

weather.getCurrent().then(data => {
    console.log(`Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`)
})
```

# Docs

* [Methods][methods]
  * [Setting & Getting options][gglobalopt]
    * [getGlobalOptions][gglobalopt]
    * [setKey][skey]
    * [getKey][gkey]
    * [setLanguage][slang]
    * [getLanguage][glang]
    * [setUnits][sunits]
    * [getUnits][gunits]
    * [setLocationByName][slocbyname]
    * [setLocationByCoordinates][slocbycoor]
    * [setLocationByZipCode][slocbyzip]
    * [getLocation][gloc]
    * [getAllLocations][gallloc]
  * [Getting & Manipulating Weather Data][gcur]
    * [getCurrent][gcur]
    * [getMinutelyForecast][gminutely]
    * [getHourlyForecast][ghourly]
    * [getDailyForecast][gdaily]
    * [getToday][gtoday]
    * [getAlerts][galerts]
    * [getEverything][gevery]
    * [getHistory][ghis]
    * [mergeWeathers][mrgweathers]
  * [Getting Air Pollution Data][apcur]
    * [getCurrentAirPollution][apcur]
    * [getForecastedAirPollution][apfut]
    * [getHistoryAirPollution][aphis]
* [Models][models]
  * [Options][opt]
  * [Weather Object][wobj]
  * [Air Pollution Object][apobj]
  * [Alert Object][aobj]
  * [Location Object][lobj]

# Methods:

<!--
## method(args)

**Description:**

Description of the method

**Arguments:**
* **arg** - arg description

**Returns:**

What does it return - `type`

**Example:**
```js
let example = await weather.method(arg)
```
*See also:*
-->


## getGlobalOptions()

**Description:**

Getter for global options.

**Returns:**

Global options - `Object`

**Example:**
```js
let options = weather.getGlobalOptions()
```
*See also:* [options][opt]

## setKey(key)

**Description:**

Sets global API key.

**Arguments:**
* **key** - API key

**Example:**
```js
weather.setKey("key")
```
*See also:* [options][opt], [getKey][gkey]

## getKey()

**Description:**

Getter for global key.

**Returns:**

Global API key - `String`

**Example:**
```js
let key = weather.getKey()
```
*See also:* [options][opt], [setKey][skey]

## setLanguage(lang)

**Description:**

Sets global language (Language must be listed [here](https://openweathermap.org/current#multi)).

**Arguments:**
* **lang** - language

**Example:**
```js
weather.setLanguage("en")
```
*See also:* [options][opt], [getLanguage][glang]

## getLanguage()

**Description:**

Getter for global language.

**Returns:**

Global language - `String`

**Example:**
```js
let language = weather.getLanguage()
```
*See also:* [options][opt], [setLanguage][slang]
## setUnits(units)

**Description:**

Sets global units.

**Arguments:**
* **units** - units (Only **standard**, **metric** or **imperial** are supported)

**Example:**
```js
weather.setUnits("imperial")
```
*See also:* [options][opt], [getUnits][gunits]

## getUnits()

**Description:**

Getter for global units.

**Returns:**

Global units - `String`

**Example:**
```js
let units = weather.getUnits()
```
*See also:* [options][opt], [setUnits][sunits]

## setLocationByName(name)

**Description:**

Sets global location by provided name. The `name` argument will basically replace the `q` parameter in call described [here](https://openweathermap.org/api/geocoding-api#direct_name).

**Arguments:**
* **name** - name of the location

**Example:**
```js
weather.setLocationByName("London")
```
*See also:* [options][opt], [getLocation][gloc]

## setLocationByCoordinates(lat, lon)

**Description:**

Sets global location by provided coordinates.

**Arguments:**
* **lat** - latitude of the location
* **lon** - longitude of the location

**Example:**
```js
weather.setLocationByCoordinates(40.71, -74)
```
*See also:* [options][opt], [getLocation][gloc]

## setLocationByZipCode(zipCode)

**Description:**

Sets global location by provided zip/post code. The `zipCode` argument will basically replace the `zip` parameter in call described [here](https://openweathermap.org/api/geocoding-api#direct_zip).

**Arguments:**
* **zipCode** - zip/post code and country code divided by comma. Please use ISO 3166 country codes: `{zip code},{country code}`

**Example:**
```js
weather.setLocationByZipCode("E14,GB")
```
*See also:* [options][opt], [getLocation][gloc]

## `async` getLocation(options = {})

**Description:**

Getter for location.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

[Location Object][lobj] - `Object`

**Example:**
```js
let location = await weather.getLocation()
// or with options
location = await weather.getLocation({locationName: "Tokio"})
```
*See also:* [options][opt], [setLocationByName][slocbyname], [setLocationByCoordinates][slocbycoor]

## `async` getAllLocations(query, options = {})

**Description:**

Getter for all locations from query

**Arguments:**
* **query** - query used to search the locations
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Location Objects][lobj] - `Array`

**Example:**
```js
let locations = await weather.getAllLocations("London")
```
*See also:* [options][opt]

## `async` getCurrent(options = {})

**Description:**

Getter for current weather.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

[Weather object][wobj] of current weather - `Object`

**Example:**
```js
let current = await weather.getCurrent()
// or with options
current = await weather.getCurrent({units: "metric"})
```
*See also:* [options][opt], [Weather Object][wobj]

## `async` getMinutelyForecast(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for minutely weather.

**Arguments:**
* **limit** - maximum length of returned array (defaults to positive infinity aka as much as possible)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Weather objects][wobj], one for every next minute (Empty if API returned no info about minutely weather) - `Array`

**Example:**
```js
let minutely = await weather.getMinutelyForecast()
// or with limit
minutely = await weather.getMinutelyForecast(10)
// here minutely.length won't be larger than 10
```
*See also:* [options][opt], [Weather Object][wobj]

## `async` getHourlyForecast(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for hourly weather.

**Arguments:**
* **limit** - maximum length of returned array (defaults to positive infinity aka as much as possible)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Weather objects][wobj], one for every next hour (Empty if API returned no info about hourly weather) - `Array`

**Example:**
```js
let hourly = await weather.getMinutelyForecast()
// or with limit
hourly = await weather.getMinutelyForecast(5)
// here hourly.length won't be larger than 5
```
*See also:* [options][opt], [Weather Object][wobj]

## `async` getDailyForecast(limit = Number.POSITIVE_INFINITY, includeToday = false, options = {})

**Description:**

Getter for daily weather.

**Arguments:**
* **limit** - maximum length of returned array (defaults to positive infinity aka as much as possible)
* **includeToday** - boolean indicating whether to include today's weather in returned array (defaults to false)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Weather objects][wobj], one for every next day (Empty if API returned no info about daily weather) - `Array`

**Example:**
```js
let daily = await weather.getDailyForecast()
// or with limit
daily = await weather.getDailyForecast(3)
// here daily.length won't be larger than 3
```
*See also:* [options][opt], [Weather Object][wobj]

## `async` getToday(options = {})

**Description:**

Getter for today's weather. Equivalent to:
```js
let today = (await weather.getDailyForecast(1, true, options))[0]
```
**Not** the same as current weather. [`getCurrent()`]() returns *current* weather and this method returns summary of the *whole* present day.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

[Weather object][wobj] of today's weather - `Object`

**Example:**
```js
let today = await weather.getToday()
// or with options
today = await weather.getToday({coordinates:{
    lat: -33.84,
    lon: 151.18
}})
```
*See also:* [options][opt], [Weather Object][wobj], [getDailyForecast][gdaily]

## `async` getAlerts(options = {})

**Description:**

Getter for alerts.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Alert Objects][aobj] - `Array`

**Example:**
```js
let alerts = await weather.getAlerts()
```
*See also:* [options][opt], [Alert Object][aobj]

## `async` getEverything(options = {})

**Description:**

Getter for every type of weather call and alerts.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Object that looks like this:
```
{
    lat: latitude of the location,
    lon: longitude of the location,
    timezone: timezone of the location,
    timezone_offset: timezone offset of the location,
    current: current weather object,
    minutely: array of minutely weather objects,
    hourly: array of hourly weather objects,
    daily: array of daily weather objects,
    alerts: array of alert objects
}
```

**Example:**
```js
let everything = await weather.getEverything()
let current = everything.current
let minutely = everything.minutely
// and so on...
```
*See also:* [options][opt], [Weather Object][wobj], [Alert Object][aobj]

## `async` getHistory(dt, options = {})

**Description:**

Getter for historical data about weather.

**Arguments:**
* **dt** - Date from the **previous five days** (Unix time, UTC time zone)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Object that looks like this:
```
{
    lat: latitude of the location,
    lon: longitude of the location,
    timezone: timezone of the location,
    timezone_offset: timezone offset of the location,
    current: weather object of current data of the time given,
    hourly: data block containing hourly historical data starting at 00:00 on the requested day and continues until 23:59 on the same day (UTC time)
}
```

**Example:**
```js
let history = await weather.getHistory(new Date().getTime() - 7200)
```
*See also:* [options][opt], [Weather Object][wobj]

## mergeWeathers(weathers)

**Description:**

Merges [weather objects][wobj]. Useful if for example you want to get minutely [weather object][wobj] but with more data than only rain volume, in this case you can merge minutely [weather object][wobj] with current [weather object][wobj] and get full [weather object][wobj] with data in nth minutes.

**Arguments:**
* **weathers** - Array of weather objects that you want to merge

**Returns:**

Merged object of weather provided in weathers parameter - `Object`

**Example:**
```js
let current = await weather.getCurrent()
let minutely = await weather.getMinutelyForecast()
let full = weather.mergeWeathers([minutely[20], current])
```
*See also:* [Weather Object][wobj]

## `async` getCurrentAirPollution(options = {})

**Description:**

Getter for current data about air pollution.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

[Air Pollution Object][apobj] with data about current pollution - `Object`

**Example:**
```js
let currentAirPollution = await weather.getCurrentAirPollution()
```
*See also:* [options][opt], [Air Pollution Object][apobj]

## `async` getForecastedAirPollution(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for future data about air pollution. (Only five days ahead)

**Arguments:**
* limit - maximum length of returned array
* options - options used only for this call

**Returns:**

Array of [Air Pollution Objects][apobj] with data about future pollution - `Array`

**Example:**
```js
let futureAirPollution = await weather.getForecastedAirPollution(12) // limit to 12 hours
```
*See also:* [options][opt], [Air Pollution Object][apobj]

## `async` getHistoryAirPollution(from, to, options = {})

**Description:**

Getter for historical data about air pollution\
**WARNING⚠️**- Historical data is accessible from 27th November 2020

**Arguments:**
* from - start date (unix time, UTC time zone)
* to - end date (unix time, UTC time zone)
* options - options used only for this call

**Returns:**

Array of [Air Pollution Objects][apobj] with data about historical pollution - `Array`

**Example:**
```js
let historyAirPollution = await weather.getHistoryAirPollution(new Date(2021, 9, 27), new Date(2021, 10, 11)) // get data from 27 October 2021 to 11 November 2021
```
*See also:* [options][opt], [Air Pollution Object][apobj]

# Models

## Options

This package use so called *options*, options define: API key, coordinates, units etc. Structure of options:
```js
{
    key: "your API key" - String,
    language: "language to use" - String,
    units: "units to use" - String,
    locationName: "name of the location" - String,
    zipCode: "'zip code' of the location" - String,
    coordinates: {
        lat: "latitude of the location" - Number,
        lon: "longitude of the location" - Number
    }
}
```
In the constructor of the class you can pass object that will define *global options*, they will be used by default in any method that uses options (ex. weather calls). 

Some methods have `options` argument which can be used to specify options only for this call. Options specified in `options` argument will override global options. for example if your global options look like this:
```js
{
    key: "xyz",
    locationName: "Moscow"
} // global options
```
and you pass options that look like this:
```js
{
    locationName: "Chicago"
} // options passed to `options` argument
```
actual used options will look like this:
```js
{
    key: "xyz",
    locationName: "Chicago"
} // actual used options
```
because every option specified in `options` argument will override the corresponding global option.

## Weather Object

When using raw API the problem might be getting your head around how unorganised the responses might be. This package simplifies this and makes every returned object the same structure. Every weather object will look like this:
```js
// property: "Description" - type
{
    lat: "Geographical coordinates of the location (latitude) " - Number, 
    lon: "Geographical coordinates of the location (longitude)" - Number,
    dt: "Current time, Unix, UTC or Time of the forecasted data, Unix, UTC" - Date, 
    timezone: "Timezone name for the requested location" - String,
    timezone_offset: "Shift in seconds from UTC" - Number, 
    astronomical: {
        sunrise: "Sunrise time, Unix, UTC" - Date, 
        sunset: "Sunset time, Unix, UTC" - Date,
        moonrise: "The time of when the moon rises for this day, Unix, UTC" - Date,
        moonset: "The time of when the moon sets for this day, Unix, UTC" - Date,
        moon_phase: "Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively." - Number
    },
    weather: {
        temp: { // Actual temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
            cur: "Current temperature or estimated temperature (in hourly forecast)" - Number,
            morn: "Morning temperature." - Number,  
            day: "Day temperature." - Number,  
            eve: "Evening temperature." - Number,  
            night: "Night temperature." - Number,  
            min: "Lowest daily temperature." - Number,  
            max: "Highest daily temperature." - Number  
        },
        feels_like: { // This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
            cur: "Current temperature or estimated temperature (in hourly forecast)." - Number,  
            morn: "Morning temperature." - Number,  
            day: "Day temperature." - Number,  
            eve: "Evening temperature." - Number,  
            night: "Night temperature." - Number  
        },
        pressure: "Atmospheric pressure on the sea level, hPa" - Number,  
        humidity: "Humidity, %" - Number,  
        dew_point: "Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit." - Number,  
        clouds: "Cloudiness, %" - Number,  
        uvi: "The maximum value of UV index for the day" - Number,  
        visibility: "Average visibility, metres" - Number,  
        wind: { // Wind statistics. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
            speed: "Wind speed." - Number,   
            gust: "Wind gust." - Number,  
            deg: "Wind direction, degrees (meteorological)" - Number  
        },
        pop: "Probability of precipitation" - Number,  
        rain: "Precipitation volume, mm" - Number,  
        snow: "Snow volume, mm" - Number,  
        condition_id: "Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)" - Number,  
        main: "Group of weather parameters (Rain, Snow, Extreme etc.)" - String,  
        description: "Description of the weather" - String,  
        icon: {
            url: "Weather icon url." - String,  
            raw: "Weather icon id." - String   
        }
    }
}
```
**⚠️ API does not specify every value in every call so some of those values might be `undefined` for example daily weather object won't have weather.temp.cur!**

## Location Object
```js
// property: "Description" - type
{
    lat: "Geographical coordinates of the found location (latitude)" - Number,
    lon: "Geographical coordinates of the found location (longitude)" - Number,
    name: "Name of the found location" - String,
    country: "Country of the found location" - Number,
    state: "State of the found location (where available) " - String | undefined,
    aqi_name: "String substitute of aqi field (only english)" - String,
    local_names: {
        [language_code]: "Name of the found location in different languages. The list of names can be different for different locations" - String,
        ascii: "Internal field" - String,
        feature_name: "Сoncentration of NO2 (Nitrogen dioxide), μg/m3" - String
    }
}
```

## Air Pollution Object
```js
// property: "Description" - type
{
    lat: "Geographical coordinates of the location (latitude)" - Number,
    lon: "Geographical coordinates of the location (longitude)" - Number,
    dt: "Date and time, UTC" - Date,
    dt_raw: "Date and time, Unix, UTC" - Number,
    aqi: "Air Quality Index" - Number,
    aqi_name: "String substitute of aqi field (only english)" - String,
    components: {
        co: "Сoncentration of CO (Carbon monoxide), μg/m3" - Number,
        no: "Сoncentration of NO (Nitrogen monoxide), μg/m3" - Number,
        no2: "Сoncentration of NO2 (Nitrogen dioxide), μg/m3" - Number,
        o3: "Сoncentration of O3 (Ozone), μg/m3" - Number,
        so2: "Сoncentration of SO2 (Sulphur dioxide), μg/m3" - Number,
        pm2_5: "Сoncentration of PM2.5 (Fine particles matter), μg/m3" - Number,
        pm10: "Сoncentration of PM10 (Coarse particulate matter), μg/m3" - Number,
        nh3: "Сoncentration of NH3 (Ammonia), μg/m3" - Number
    }
}
```

## Alert Object
```js
// property: "Description" - type
{
    sender_name: "Name of the alert source. Please read here the full list of alert sources: https://openweathermap.org/api/one-call-api#listsource" - String,
    event: "Alert event name" - Number,
    start: "Date and time of the start of the alert, Unix, UTC" - Number,
    end: "Date and time of the start of the alert, Unix, UTC" - Number,
    description: "Description of the alert" - String,
    tags: "Type of severe weather" - Array
}
```
*made by loloToster* 🍞

[models]: #models
[opt]: #options
[wobj]: #weather-object
[lobj]: #location-object
[apobj]: #air-pollution-object
[aobj]: #alert-object
[methods]: #methods
[gglobalopt]: #getglobaloptions
[skey]: #setkeykey
[gkey]: #getkey
[slang]: #setlanguagelang
[glang]: #getlanguage
[sunits]: #setunitsunits
[gunits]: #getunits
[slocbyname]: #setlocationbynamename
[slocbycoor]: #setlocationbycoordinateslat-lon
[slocbyzip]:#setlocationbyzipcodezipcode
[gloc]: #async-getlocationoptions
[gallloc]: #async-getAllLocationsquery-options--
[gcur]: #async-getcurrentoptions
[gminutely]: #async-getminutelyforecastlimit--numberpositive_infinity-options--
[ghourly]: #async-gethourlyforecastlimit--numberpositive_infinity-options--
[gdaily]: #async-getdailyforecastlimit--numberpositive_infinity-includetoday--false-options--
[gtoday]: #async-gettodayoptions--
[galerts]: #async-getalertsoptions--
[gevery]: #async-geteverythingoptions--
[ghis]: #async-gethistorydt-options--
[mrgweathers]: #mergeweathersweathers
[apcur]: #async-getcurrentairpollutionoptions--
[apfut]: #async-getforecastedairpollutionlimit--numberpositive_infinity-options--
[aphis]: #async-gethistoryairpollutionfrom-to-options--
