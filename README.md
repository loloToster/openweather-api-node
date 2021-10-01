# openweathermap-api ☁️
![version](https://img.shields.io/badge/version-1.0.0-g?style=flat-square)
![issues](https://img.shields.io/github/issues-raw/loloToster/openweathermap-api?style=flat-square)
![license](https://img.shields.io/apm/l/openweathermap-api?style=flat-square)

![NPM](https://nodei.co/npm/openweathermap-api.png?compact=true)

Simple Node.js package that makes it easy to work with OpenWeather API. If you want to learn how to use this package check out examples in *examples* folder. The only thing that you need to get started is API key if you don't have one go to [OpenWeatherMap website](https://openweathermap.org/) and get it. For now this package supports only some weather calls but we are planning on adding more features like: historical data, maps and all the other stuff that is available for free in OpenWeatherMap API.

## Table of contents

* [Methods][methods]
  * [getGlobalOptions][gglobalopt]
  * [setKey][skey]
  * [getKey][gkey]
  * [setLanguage][slang]
  * [getLanguage][glang]
  * [setUnits][sunits]
  * [getUnits][gunits]
  * [setLocationByName][slocbyname]
  * [setLocationByCoordinates][slocbycoor]
  * [getLocation][gloc]
  * [getCurrent][gcur]
  * [getMinutelyForecast][gminutely]
  * [getHourlyForecast][ghourly]
  * [getDailyForecast][gdaily]
  * [getToday][gtoday]
  * [getAlerts][galerts]
  * [getEverything][gevery]
  * [mergeWeathers][mrgweathers]
* [Unique features of this package][features]
  * [Options][opt]
  * [Weather Object][wobj]

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

Getter for global options

**Returns:**

Global options - `Object`

**Example:**
```js
let options = weather.getGlobalOptions()
```
*See also:* [options][opt]

## setKey(key)

**Description:**

Sets global API key

**Arguments:**
* **key** - API key

**Example:**
```js
weather.setKey("key")
```
*See also:* [options][opt]

## getKey()

**Description:**

Getter for global key

**Returns:**

Global API key - `String`

**Example:**
```js
let key = weather.getKey()
```
*See also:* [options][opt]

## setLanguage(lang)

**Description:**

Sets global language (Language must be listed [here](https://openweathermap.org/current#multi))

**Arguments:**
* **lang** - language

**Example:**
```js
weather.setLanguage("en")
```
*See also:* [options][opt]

## getLanguage()

**Description:**

Getter for global language

**Returns:**

Global language - `String`

**Example:**
```js
let language = weather.getLanguage()
```
*See also:* [options][opt]
## setUnits(units)

**Description:**

Sets global units

**Arguments:**
* **units** - units (Only **standard**, **metric** or **imperial** are supported)

**Example:**
```js
weather.setUnits("imperial")
```
*See also:* [options][opt]

## getUnits()

**Description:**

Getter for global units

**Returns:**

Global units - `String`

**Example:**
```js
let units = weather.getUnits()
```
*See also:* [options][opt]

## setLocationByName(name)

**Description:**

Sets global location by provided name

**Arguments:**
* **name** - name of the location

**Example:**
```js
weather.setLocationByName("London")
```
*See also:* [options][opt]

## setLocationByCoordinates(lat, lon)

**Description:**

Sets global location by provided coordinates

**Arguments:**
* **lat** - latitude of the location
* **lon** - longitude of the location

**Example:**
```js
weather.setLocationByCoordinates(40.71, -74)
```
*See also:* [options][opt]

## `async` getLocation(options = {})

**Description:**

Getter for location

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

location - `Object`

**Example:**
```js
let location = await weather.getLocation()
// or with options
location = await weather.getLocation({locationName: "Tokio"})
```
*See also:* [options][opt]

## `async` getCurrent(options = {})

**Description:**

Getter for current weather

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
*See also:* [options][opt]

## `async` getMinutelyForecast(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for [minutely]() weather

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
*See also:* [options][opt]

## `async` getHourlyForecast(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for [hourly]() weather

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
*See also:* [options][opt]

## `async` getDailyForecast(limit = Number.POSITIVE_INFINITY, includeToday = false, options = {})

**Description:**

Getter for [daily]() weather

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
*See also:* [options][opt]

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
daily = await weather.getDailyForecast({coordinates:{
    lat: -33.84,
    lon: 151.18
}})
```
*See also:* [options][opt]

## `async` getAlerts(options = {})

**Description:**

Getter for [alerts]()

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Alerts (`undefined` if API returned no info about alerts) - `Object`

**Example:**
```js
let alerts = await weather.getAlerts()
```
*See also:* [options][opt]

## `async` getEverything(options = {})

**Description:**

Getter for every type of weather call and alerts

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
    alerts: alerts
}
```

**Example:**
```js
let everything = await weather.getEverything()
let current = everything.current
let minutely = everything.minutely
// and so on...
```
*See also:* [options][opt]

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
let full = await weather.mergeWeathers([minutely[20], current])
```
*See also:*

# Unique features of this package

## Options

This package use so called *options*, options define: API key, coordinates, units etc.

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
**API does not specify every value in every call so some of those values might be `undefined` for example daily weather object wont have weather.temp.cur!**

[features]: #unique-features-of-this-package
[opt]: #options
[wobj]: #weather-object
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
[gloc]: #async-getlocationoptions
[gcur]: #async-getcurrentoptions
[gminutely]: #async-getminutelyforecastlimit--numberpositive_infinity-options--
[ghourly]: #async-gethourlyforecastlimit--numberpositive_infinity-options--
[gdaily]: #async-getdailyforecastlimit--numberpositive_infinity-includetoday--false-options--
[gtoday]: #async-gettodayoptions--
[galerts]: #async-getalertsoptions--
[gevery]: #async-geteverythingoptions--
[mrgweathers]: #mergeweathersweathers
