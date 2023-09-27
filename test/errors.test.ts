import fs from "fs";
import OpenWeatherAPI, { Language, Unit } from "../src";

// ! Remeber to specify key in key.txt file
const key = fs.readFileSync("./test/key.txt").toString().trim();

describe("Error tests:", () => {
  const emptyValues = ["", 0, null, undefined, false, NaN];

  const weather = new OpenWeatherAPI({
    key, locationName: "Hong Kong"
  });

  it("handles invalid key", async () => {
    try {
      await weather.getCurrent({ key: "ptero" });
    } catch (err: any) {
      err = JSON.parse(err.message);
      expect(err.cod).toBe(401);
    }
  });

  it("handles wrong coordinates", () => {
    expect(
      () => weather.setLocationByCoordinates("-200" as any, 78)
    ).toThrow(/invalid coordinates/i);
  });

  it("handles wrong location name", async () => {
    await expect(
      weather.getCurrent({ locationName: "ptero" })
    ).rejects.toThrow(/ptero/i);
  });

  it("handles wrong language", () => {
    expect(
      () => weather.setLanguage("ptero" as Language)
    ).toThrow(/ptero/i);
  });

  it("handles wrong unit", () => {
    expect(
      () => weather.setUnits("ptero" as Unit)
    ).toThrow(/ptero/i);
  });

  it("handles unknown parameter", async () => {
    await expect(
      weather.getCurrent({ ptero: "" } as any)
    ).rejects.toThrow(/ptero/i);
  });

  it("handles wrong type of option argument", async () => {
    await expect(
      weather.getCurrent("ptero" as {})
    ).rejects.toThrow(/provide {}/i);
  });

  it("handles empty location name", () => {
    emptyValues.forEach((element) => {
      expect(
        () => weather.setLocationByName(element as string)
      ).toThrow(/empty/i);
    });
  });

  it("handles empty key", () => {
    emptyValues.forEach((element) => {
      expect(
        () =>  weather.setKey(element as string)
      ).toThrow(/empty/i);
    });
  });

  it("handles future in history", async () => {
    await expect(
      weather.getHistory(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
    ).rejects.toThrow(/requested time is out the available range/i);
  });

  it("handles no time in history", async () => {
    await expect(
      // @ts-ignore
      weather.getHistory()
    ).rejects.toThrow(/provide time/i);
  });
});
