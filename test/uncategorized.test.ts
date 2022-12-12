import fs from "fs";
import OpenWeatherAPI from "../src";

// ! Remeber to specify key in key.txt file
const key = fs.readFileSync("./test/key.txt").toString().trim();

const weather = new OpenWeatherAPI();

describe("Uncategorized tests:", function () {
  it("handles key in options", async () => {
    await weather.getCurrent({
      locationName: "Ottawa",
      key: key,
    });
  });
});
