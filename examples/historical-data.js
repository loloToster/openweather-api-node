const OpenWeatherAPI = require("..")

// Set global key, location and units
let weather = new OpenWeatherAPI({
    key: "put-key-here",
    coordinates: {
        lat: 49.84,
        lon: 24.03
    }
})

// getHistory is asynchronous so we can use .then()
// we pass a timestamp of the time that was 15 minutes ago
weather.getHistory(new Date().getTime() - 900000).then(async data => {
    let time = data.current.dt
    let location = await weather.getLocation()
    // and we get temperature from 15 minutes ago
    console.log(`The temperature at ${time.getHours()}:${time.getMinutes()} in ${location.name} was ${data.current.weather.temp.cur}\u00B0K`)
})
