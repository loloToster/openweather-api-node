const OpenWeatherAPI = require("..")

// Set global key, location and units
let weather = new OpenWeatherAPI({
    key: "put-key-here",
    locationName: "Sydney",
    units: "imperial"
})

const days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

console.log("Daily forecast in Sydney:")
weather.getDailyForecast().then(data => {
    let table = []
    let today = (new Date()).getDay()
    data.forEach((e, i) => {
        let newE = {}
        newE.day = days[today + i > 6 ? today + i - 7 : today + i]
        newE.temp = `${e.weather.temp.day}\u00B0F`
        newE.rain = `${e.weather.rain}mm`
        newE.description = e.weather.description
        table.push(newE)
    })
    console.table(table)
})
