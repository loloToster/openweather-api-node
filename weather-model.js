const weatherModel = {
    lat: undefined, // Geographical coordinates of the location (latitude)
    lon: undefined, // Geographical coordinates of the location (longitude)
    dt: undefined,  // Timezone name for the requested location
    dt_raw: undefined,
    timezone: undefined, // Shift in seconds from UTC
    timezone_offset: undefined, // Shift in seconds from UTC
    astronomical: {
        sunrise: undefined, // Sunrise time, Unix, UTC
        sunrise_raw: undefined,
        sunset: undefined, // Sunset time, Unix, UTC
        sunset_raw: undefined,
        moonrise: undefined, // The time of when the moon rises for this day, Unix, UTC
        moonrise_raw: undefined,
        moonset: undefined, // The time of when the moon sets for this day, Unix, UTC
        moonset_raw: undefined,
        moon_phase: undefined // Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
    },
    weather: {
        temp: { // Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
            main: undefined, // Current temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit.
            morn: undefined, // Morning temperature.
            day: undefined, // Day temperature.
            eve: undefined, // Evening temperature.
            night: undefined, // Night temperature.
            min: undefined, // Lowest daily temperature.
            max: undefined // Highest daily temperature.
        },
        feels_like: { // This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
            main: undefined, // Current temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit.
            morn: undefined, // Morning temperature.
            day: undefined, // Day temperature.
            eve: undefined, // Evening temperature.
            night: undefined // Night temperature.
        },
        pressure: undefined, // Atmospheric pressure on the sea level, hPa
        humidity: undefined, // Humidity, %
        dew_point: undefined, // Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
        clouds: undefined, // Cloudiness, %
        uvi: undefined, // The maximum value of UV index for the day
        visibility: undefined, // Average visibility, metres
        wind: {
            speed: undefined, // Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
            gust: undefined, // Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
            deg: undefined // Wind direction, degrees (meteorological)
        },
        pop: undefined, // Probability of precipitation
        rain: undefined, // Precipitation volume, mm
        snow: undefined, // Snow volume, mm
        condition_id: undefined, // Weather condition id (https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
        main: undefined, // Group of weather parameters (Rain, Snow, Extreme etc.)
        description: undefined, // Description of the weather
        icon: {
            url: undefined, // Weather icon url.
            raw: undefined  // Weather icon id.
        }
    }
}

function getWeatherModel() {
    return JSON.parse(JSON.stringify(weatherModel))
}

module.exports = getWeatherModel
