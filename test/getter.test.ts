import fs from "fs";
import OpenWeatherAPI from "../src";

// ! Remeber to specify key in key.txt file
const key = fs.readFileSync("./test/key.txt").toString().trim();

const weather = new OpenWeatherAPI({
  key: key,
});

describe("Getting tests:", function () {
  it("gets location", async () => {
    weather.setLocationByCoordinates(40.71, -74);
    let location = await weather.getLocation();
    expect(location!.name.toLowerCase().includes("new york")).toBeTruthy();
  });

  it("gets all locations", async () => {
    let locations = await weather.getAllLocations("Lousã");
    expect(locations.length).toBeGreaterThan(0);
  });

  it("gets current", async () => {
    weather.setLocationByName("warsaw");
    let current = await weather.getCurrent();
    expect(typeof current.weather.temp.cur).toBe("number");
  });

  it("gets minutely", async () => {
    weather.setLocationByCoordinates(40.71, -74);
    let minutely = await weather.getMinutelyForecast(48);
    if (!minutely.length) {
      console.log("\t\x1b[31mEmpty minutely: ", minutely);
      expect(typeof minutely).toBe("object");
    } else {
      expect(minutely.length).toBe(48);
      expect(typeof minutely[Math.floor(Math.random() * 40)].weather.rain).toBe(
        "number"
      );
    }
  });

  it("gets hourly", async () => {
    weather.setLocationByZipCode("E14,GB");
    let hourly = await weather.getHourlyForecast(10);
    if (!hourly.length) {
      console.log("\t\x1b[31mEmpty hourly: ", hourly);
      expect(typeof hourly).toBe("object");
    } else {
      expect(hourly.length).toBe(10);
      expect(typeof hourly[Math.floor(Math.random() * 8)].weather.rain).toBe(
        "number"
      );
    }
  });

  it("gets daily", async () => {
    weather.setLocationByCoordinates(10, -40);
    let daily = await weather.getDailyForecast(3);
    if (!daily.length) {
      console.log("\t\x1b[31mEmpty daily: ", daily);
      expect(typeof daily).toBe("object");
    } else {
      expect(daily.length).toBe(3);
      expect(typeof daily[Math.floor(Math.random() * 2)].weather.rain).toBe(
        "number"
      );
    }
  });

  it("gets alerts", async () => {
    weather.setLocationByName("Giza");
    let alerts = await weather.getAlerts();
    expect(typeof alerts).toBe("object");
  });

  it("gets everything", async () => {
    weather.setLocationByCoordinates(0, 0);
    let everything = await weather.getEverything();
    expect(typeof everything.current.weather.temp.cur).toBe("number");
    expect(typeof everything.minutely).toBe("object");
    expect(
      typeof everything.hourly[Math.floor(Math.random() * 20)].weather.rain
    ).toBe("number");
    expect(
      typeof everything.daily[Math.floor(Math.random() * 5)].weather.rain
    ).toBe("number");
  });

  it("gets history", async () => {
    weather.setLocationByCoordinates(49.84, 24.03);
    let date = new Date().getTime() - 900000;
    let history = await weather.getHistory(date);
    expect(Math.round(date / 1000)).toBe(history.current.dtRaw);
  });

  it("gets current air pollution", async () => {
    let pollution = await weather.getCurrentAirPollution({
      locationName: "Paris",
    });

    expect(
      Object.values(pollution.components).every((v) => typeof v === "number")
    ).toBeTruthy();
  });

  it("gets forecasted air pollution", async () => {
    let pollution = await weather.getForecastedAirPollution(10, {
      locationName: "Chicago",
    });
    expect(pollution.length).toBe(10);
    expect(
      Object.values(pollution[Math.floor(Math.random() * 9)].components).every(
        (v) => typeof v === "number"
      )
    ).toBeTruthy();
  });

  it("gets historical air pollution", async () => {
    let currentDate = new Date();
    let dateFrom12HoursAgo = new Date().setHours(currentDate.getHours() - 12);
    let pollution = await weather.getHistoryAirPollution(
      dateFrom12HoursAgo,
      currentDate,
      { coordinates: { lat: 10, lon: 10 } }
    );
    expect(pollution.length).toBe(12);
    expect(
      Object.values(pollution[Math.floor(Math.random() * 10)].components).every(
        (v) => typeof v === "number"
      )
    ).toBeTruthy();
  });
});
