# todo:
* handle empty arguments `""`
* include info about empty arrays in weather getters

# openweathermap-api ☁️
Despription
## Methods:

<!--
## method(args)

**Description:**

Description of the method

**Params:**
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

**Params:**
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

**Params:**
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

**Params:**
* **units** - units (Only: **standard**, **metric** or **imperial** are supported)

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

**Params:**
* **name** - name of the location

**Example:**
```js
weather.setLocationByName("London")
```
*See also:* [options]()

## setLocationByCoordinates(lat, lon)

**Description:**

Sets global location by provided coordinates

**Params:**
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

**Params:**
* **options** - options used only for this call (optional)

**Example:**
```js
let location = await weather.getLocation()
```
*See also:* [options]()
