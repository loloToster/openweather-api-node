# todo:
* include info about empty arrays in weather getters
* add icon url

# openweathermap-api ☁️
Despription
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
*See also:* [options]()

## setKey(key)

**Description:**

Sets global API key

**Arguments:**
* **key** - API key

**Example:**
```js
weather.setKey("key")
```
*See also:* [options]()

## getKey()

**Description:**

Getter for global key

**Returns:**

Global API key - `String`

**Example:**
```js
let key = weather.getKey()
```
*See also:* [options]()

## setLanguage(lang)

**Description:**

Sets global language (Language must be listed [here](https://openweathermap.org/current#multi))

**Arguments:**
* **lang** - language

**Example:**
```js
weather.setLanguage("en")
```
*See also:* [options]()

## getLanguage()

**Description:**

Getter for global language

**Returns:**

Global language - `String`

**Example:**
```js
let language = weather.getLanguage()
```
*See also:* [options]()
## setUnits(units)

**Description:**

Sets global units

**Arguments:**
* **units** - units (Only **standard**, **metric** or **imperial** are supported)

**Example:**
```js
weather.setUnits("imperial")
```
*See also:* [options]()

## getUnits()

**Description:**

Getter for global units

**Returns:**

Units - `String`

**Example:**
```js
let units = weather.getUnits()
```
*See also:* [options]()

## setLocationByName(name)

**Description:**

Sets global location by provided name

**Arguments:**
* **name** - name of the location

**Example:**
```js
weather.setLocationByName("London")
```
*See also:* [options]()

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
*See also:* [options]()

## `async` getLocation(options={})

**Description:**

Getter for location

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Example:**
```js
let location = await weather.getLocation()
// or with options
location = await weather.getLocation({locationName: "Tokio"})
```
*See also:* [options]()

## `async` getCurrent(options = {})

**Description:**

Getter for current weather

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

[Weather object]() of current weather - `Object`

**Example:**
```js
let current = await weather.getCurrent()
// or with options
current = await weather.getCurrent({units: "metric"})
```
*See also:* [options]()

## `async` getMinutelyForecast(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for [minutely]() weather

**Arguments:**
* **limit** - maximum length of returned array (defaults to positive infinity aka as much as possible)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Weather objects](), one for every next minute (Empty if API returned no info about this type) - `Array`

**Example:**
```js
let minutely = await weather.getMinutelyForecast()
// or with limit
minutely = await weather.getMinutelyForecast(10)
// here minutely.length won't be larger than 10
```
*See also:* [options]()

## `async` getHourlyForecast(limit = Number.POSITIVE_INFINITY, options = {})

**Description:**

Getter for [hourly]() weather

**Arguments:**
* **limit** - maximum length of returned array (defaults to positive infinity aka as much as possible)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Weather objects](), one for every next hour (Empty if API returned no info about this type) - `Array`

**Example:**
```js
let hourly = await weather.getMinutelyForecast()
// or with limit
hourly = await weather.getMinutelyForecast(5)
// here hourly.length won't be larger than 5
```
*See also:* [options]()

## `async` getDailyForecast(limit = Number.POSITIVE_INFINITY, includeToday = false, options = {})

**Description:**

Getter for [daily]() weather

**Arguments:**
* **limit** - maximum length of returned array (defaults to positive infinity aka as much as possible)
* **includeToday** - boolean indicating whether to include today in returned array (defaults to false)
* **options** - options used only for this call (defaults to empty object)

**Returns:**

Array of [Weather objects](), one for every next day (Empty if API returned no info about this type) - `Array`

**Example:**
```js
let daily = await weather.getDailyForecast()
// or with limit
daily = await weather.getDailyForecast(3)
// here daily.length won't be larger than 3
```
*See also:* [options]()

## `async` getToday(options = {})

**Description:**

Getter for today's weather. Equivalent to:
> let today = (await weather.getDailyForecast(1, true, options))[0]

**Not** the same as current weather. [`getCurrent()`]() returns *current* weather and this method returns summary of the *whole* present day.

**Arguments:**
* **options** - options used only for this call (defaults to empty object)

**Returns:**

[Weather object]() of today's weather - `Object`

**Example:**
```js
let today = await weather.getToday()
// or with options
daily = await weather.getDailyForecast({coordinates:{
    lat: -33.84,
    lon: 151.18
}})
```
*See also:* [options]()
