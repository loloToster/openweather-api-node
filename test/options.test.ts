import fs from "fs";
import OpenWeatherAPI from "../src";

// ! Remeber to specify key in key.txt file
const key = fs.readFileSync("./test/key.txt").toString().trim();

describe("Options tests:", () => {
  const weather = new OpenWeatherAPI();

  it("handles key in options", async () => {
    await weather.getCurrent({
      locationName: "Ottawa", key
    });
  });

  it("prioritizes options over global options", async () => {
    weather.setKey(key);
    weather.setLocationByName("London")

    const tokioWeather = await weather.getCurrent({
      locationName: "Tokio"
    });

    const londonWeather = await weather.getCurrent();

    expect(tokioWeather.lat).not.toEqual(londonWeather.lat);
  });
});
