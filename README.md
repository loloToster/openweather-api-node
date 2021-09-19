# Options
```js
{
    key: "API key" - String,
    lang: "Languge to use" - String, 
    units: "Units to use" - String, 
    locationName: "Name of the location" - String, 
    zipCode: "Zip code of the location" - String / Number,  
    coordinates: {
        lat: "Latitude of location" - Number,
        lon: "Longitude of location" - Number
    }
}
```

# Weather Model
```js
{
    lat: "Geographical coordinates of the location (latitude) " - Number, 
    lon: "Geographical coordinates of the location (longitude)" - Number,
    dt: "Current time, Unix, UTC" - Date, 
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
            main: "Current temperature." - Number,
            morn: "Morning temperature." - Number,  
            day: "Day temperature." - Number,  
            eve: "Evening temperature." - Number,  
            night: "Night temperature." - Number,  
            min: "Lowest daily temperature." - Number,  
            max: "Highest daily temperature." - Number  
        },
        feels_like: { // This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
            main: "Current temperature." - Number,  
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

# Methods: 

## method(args)
---
**Description:**

Description of the method

**Params:**
* **arg** - arg description

**Returns:**

What does it return

**Example:**
```js
let example = await weather.method(arg)
```
