const OpenWeatherAPI = require("..")

// Set global key, location and units
let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: "New York",
    units: "imperial"
})

// getCurrentMethod is asynchronous so we can use .then()
weather.getCurrent().then(data => {
    // Current temperature is defined in weatherModel.weather.temp.cur
    // If you are not sure what is weather model check it out in docs
    console.log(`Current temperature in New York is: ${data.weather.temp.cur}\u00B0F`)
})
