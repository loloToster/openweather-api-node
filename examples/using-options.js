const OpenWeatherAPI = require("..")

// Set global key, location and units
let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: "London",
    units: "metric"
})

// options specified here will be used ONLY for this call and won't change global options
// if some option is not specified here this option will defult to global option (For example key)
weather.getCurrent({
    locationName: "Tokio",
    units: "imperial"
}).then(data => {
    console.log(`Current temperature in Tokio is: ${data.weather.temp.cur}\u00B0F`)
    console.log(data.lon)

    // this call will use global options
    weather.getCurrent().then(data => {
        console.log(`Current temperature in London is: ${data.weather.temp.cur}\u00B0C`)
    })
})
