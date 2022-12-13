import fs from "fs";
import OpenWeatherAPI, { Language, Unit } from "../src";

// ! Remeber to specify key in key.txt file
const key = fs.readFileSync("./test/key.txt").toString().trim();

const weather = new OpenWeatherAPI({
  key: key,
  locationName: "Hong Kong",
});

describe("Error tests:", function () {
  const emptyValues = ["", 0, null, undefined, false, NaN];

  it("handles invalid key", async () => {
    try {
      await weather.getCurrent({ key: "ptero" });
    } catch (err: any) {
      err = JSON.parse(err.message);
      expect(err.cod).toBe(401);
    }
  });

  it("handles wrong coordinates", async () => {
    try {
      weather.setLocationByCoordinates("-200" as unknown as number, 78);
    } catch (err: any) {
      expect(
        err.message.toLowerCase().includes("invalid coordinates")
      ).toBeTruthy();
    }
  });

  it("handles wrong location name", async () => {
    try {
      await weather.getCurrent({ locationName: "ptero" });
    } catch (err: any) {
      expect(err.message.toLowerCase().includes("ptero")).toBeTruthy();
    }
  });

  it("handles wrong language", async () => {
    try {
      weather.setLanguage("ptero" as Language);
    } catch (err: any) {
      expect(err.message.toLowerCase().includes("ptero")).toBeTruthy();
    }
  });

  it("handles wrong unit", async () => {
    try {
      weather.setUnits("ptero" as Unit);
    } catch (err: any) {
      expect(err.message.toLowerCase().includes("ptero")).toBeTruthy();
    }
  });

  it("handles unknown parameter", async () => {
    try {
      await weather.getCurrent({ ptero: "" } as any);
    } catch (err: any) {
      expect(err.message.toLowerCase().includes("ptero")).toBeTruthy();
    }
  });

  it("handles wrong type of option argument", async () => {
    try {
      await weather.getCurrent("ptero" as {});
    } catch (err: any) {
      expect(err.message.toLowerCase().includes("provide {}")).toBeTruthy();
    }
  });

  it("handles empty location name", async () => {
    emptyValues.forEach((element) => {
      try {
        weather.setLocationByName(element as string);
        expect(false).toBe(true); // TODO: fail test
      } catch (err: any) {
        expect(err.message.toLowerCase().includes("empty")).toBeTruthy();
      }
    });
  });

  it("handles empty key", async () => {
    emptyValues.forEach((element) => {
      try {
        weather.setKey(element as string);
        expect(false).toBe(true); // TODO: fail test
      } catch (err: any) {
        expect(err.message.toLowerCase().includes("empty")).toBeTruthy();
      }
    });
  });

  it("handles future in history", async () => {
    try {
      await weather.getHistory(new Date().getTime() + 900000);
    } catch (err: any) {
      expect(
        err.message.toLowerCase().includes("requested time is in the future")
      ).toBeTruthy();
      return;
    }
    expect(false).toBe(true); // TODO: fail test
  });

  it("handles not within 5 days in history", async () => {
    try {
      await weather.getHistory(new Date().getTime() - 6 * 24 * 60 * 60 * 1000);
    } catch (err: any) {
      expect(
        err.message
          .toLowerCase()
          .includes("requested time is out of allowed range of 5 days back")
      ).toBeTruthy();
      return;
    }
    expect(false).toBe(true); // TODO: fail test
  });

  it("handles no time in history", async () => {
    try {
      // @ts-ignore
      await weather.getHistory();
    } catch (err: any) {
      expect(err.message.toLowerCase().includes("provide time")).toBeTruthy();
      return;
    }
    expect(false).toBe(true); // TODO: fail test
  });
});
