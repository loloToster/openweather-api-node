const OpenWeatherAPI = require("..")

// Set global key, location and units
let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: "Rio De Janeiro",
    units: "imperial"
})

async function main() {
    let current = await weather.getCurrent()
    let minutely = await weather.getMinutelyForecast()
    let full = weather.mergeWeathers([minutely[20], current])
    // merges 20th minute with current temperature 
    // to get minutely weather object with more data
    // with minutely being first because anything
    // specified in minutely should override current
    console.log(full)
}

main()
