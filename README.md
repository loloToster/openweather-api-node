<br>
<br>
<p align="center">
<img src="media/logo.png" alt="logo" width="65%">
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
    <img src="https://img.shields.io/npm/dt/openweather-api-node?style=flat-square" alt="Downloads">
</a>
<a href="https://github.com/loloToster/openweather-api-node/issues">
    <img src="https://img.shields.io/github/issues-raw/loloToster/openweather-api-node?style=flat-square" alt="Issues">
</a>
<a href="https://github.com/loloToster/openweather-api-node/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
</a>
<a href="https://github.com/loloToster/openweather-api-node">
    <img src="https://img.shields.io/github/stars/loloToster/openweather-api-node?label=give%20a%20star&logo=github&style=flat-square" alt="GitHub Stars">
</a>
</p>

# About

This package is a wrapper for OpenWeather API. If you want to learn how to use this package check out examples in [*examples* directory](https://github.com/loloToster/openweather-api-node/tree/master/examples). The only thing that you need to get started is API key if you don't have one go to [OpenWeatherMap website](https://openweathermap.org/) and get it. For now this package supports only a part of the API but we are planning on adding more features like: triggers, maps and all the other stuff that is available for free in OpenWeatherMap API.

Currently Supported APIs:
  * Current Weather - get **current weather**
  * Forecast - get weather **forecast for up to 5 days** with 3-hour step
  * OneCall - get **current weather** and weather **forecast for up to 7 days**
  * Geocoding - get location **latitude and longitude from its name** and vice versa
  * Historical - get weather data for **more that 40 years back**
  * Air pollution - get **current, forecasted and historical data about air pollution**

# Installation
```
npm i openweather-api-node
```

# Examples
## JS:
```js
const { OpenWeatherAPI } = require("openweather-api-node")

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

# [Documentation for v2 & v3](https://lolotoster.github.io/openweather-api-node/)

[Documentation for older versions](https://github.com/loloToster/openweather-api-node/blob/829077b6653ffcde4736f3c7aec259e222c9d395/README.md)

---

#### Old OneCall API support

This package partially uses the OneCall 3.0 api endpoint. If you want to use older version of the OneCall api you can install the latest version of the package that supported it:

```
npm i openweather-api-node@2.1.2
```
