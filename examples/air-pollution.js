const OpenWeatherAPI = require("..")

const location = "Paris"

// Set global key, location
let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: location
})

// getCurrentAirPollution is asynchronous so we can use .then()
weather.getCurrentAirPollution().then(data => {
    console.log(`Currently air quality in ${location} is ${data.aqi_name.toLowerCase()}.`)
})

// We set the limit to 24 to get only 24 hours out of 5 days
weather.getForecastedAirPollution(24).then(data => {
    console.log("The amount of each component for each hour of upcoming 24 hours:")
    console.table(
        data.map(v => {
            return { Time: v.dt.toLocaleString(), ...v.components }
        })
    )
})

let currentDate = new Date()
let dateFrom12HoursAgo = new Date().setHours(currentDate.getHours() - 12)

weather.getHistoryAirPollution(dateFrom12HoursAgo, currentDate).then(data => {
    console.log(`Air quality in ${location} 12 hours ago was ${data[0].aqi_name.toLowerCase()}.`)
})
