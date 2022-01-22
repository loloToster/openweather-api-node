const fs = require("fs")
const assert = require("assert")
const OpenWeatherAPI = require("..")

// ! Remeber to specify key in key.txt file
let key = fs.readFileSync("./test/key.txt").toString().trim()

let weather = new OpenWeatherAPI({
    key: key,
    locationName: "Hong Kong"
})

describe("Error tests:", function () {
    this.timeout(10000)

    it("handles invalid key", async () => {
        try {
            await weather.getCurrent({ key: "ptero" })
        } catch (err) {
            err = JSON.parse(err.message)
            assert(err.cod == 401)
        }
    })

    it("handles wrong coordinates", async () => {
        try {
            weather.setLocationByCoordinates("-200", 78)
        } catch (err) {
            assert(err.message.toLowerCase().includes("wrong coordinates"))
        }
    })

    it("handles wrong location name", async () => {
        try {
            await weather.getCurrent({ locationName: "ptero" })
        } catch (err) {
            assert(err.message.toLowerCase().includes("ptero"))
        }
    })

    it("handles wrong language", async () => {
        try {
            weather.setLanguage("ptero")
        } catch (err) {
            assert(err.message.toLowerCase().includes("ptero"))
        }
    })

    it("handles wrong unit", async () => {
        try {
            weather.setLanguage("ptero")
        } catch (err) {
            assert(err.message.toLowerCase().includes("ptero"))
        }
    })

    it("handles unknown parameter", async () => {
        try {
            await weather.getCurrent({ ptero: "" })
        } catch (err) {
            assert(err.message.toLowerCase().includes("ptero"))
        }
    })

    it("handles wrong type of option argument", async () => {
        try {
            await weather.getCurrent("ptero")
        } catch (err) {
            assert(err.message.toLowerCase().includes("provide {}"))
        }
    })

    it("handles empty location name", async () => {
        let testValues = ["", 0, null, undefined, false, NaN]
        testValues.forEach(element => {
            try {
                weather.setLocationByName(element)
                assert(false)
            } catch (err) {
                if (err.message.toLowerCase().includes("empty"))
                    return
                else
                    assert(false)
            }
        })
        assert(true)
    })

    it("handles empty key", async () => {
        let testValues = ["", 0, null, undefined, false, NaN]
        testValues.forEach(element => {
            try {
                weather.setKey(element)
                assert(false)
            } catch (err) {
                if (err.message.toLowerCase().includes("empty"))
                    return
                else
                    assert(false)
            }
        })
        assert(true)
    })

    it("handles future in history", async () => {
        try {
            await weather.getHistory(new Date().getTime() + 900000)
        } catch (err) {
            assert(err.message.toLowerCase().includes("requested time is in the future"))
            return
        }
        assert(false)
    })

    it("handles not within 5 days in history", async () => {
        try {
            await weather.getHistory(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
        } catch (err) {
            assert(err.message.toLowerCase().includes("requested time is out of allowed range of 5 days back"))
            return
        }
        assert(false)
    })

    it("handles no time in history", async () => {
        try {
            await weather.getHistory()
        } catch (err) {
            assert(err.message.toLowerCase().includes("provide time"))
            return
        }
        assert(false)
    })

})
