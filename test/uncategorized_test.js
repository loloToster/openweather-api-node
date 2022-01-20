const fs = require("fs")
const assert = require("assert")
const OpenWeatherAPI = require("..")

// ! Remeber to specify key in key.txt file
let key = fs.readFileSync("./test/key.txt").toString().trim()

let weather = new OpenWeatherAPI()


describe("Uncategorized tests:", function () {
    this.timeout(10000)

    it("handles key in options", async () => {
        try {
            await weather.getCurrent({
                locationName: "Ottawa",
                key: key
            })
        } catch {
            assert(false)
        }
        assert(true)
    })

    it("merges weathers", async () => {
        weather.setKey(key)
        weather.setLocationByCoordinates(40.71, -74)
        let current = await weather.getCurrent()
        let minutely = (await weather.getMinutelyForecast())[0]

        let merged = weather.mergeWeathers([minutely, current])

        assert(current != merged && minutely != merged)
    })

})
