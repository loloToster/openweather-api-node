import { AirPollution } from "types/air-pollution";

const names = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

function singleParser(data: any): AirPollution {
  const element = data.list[0];

  return {
    lat: data.coord.lat,
    lon: data.coord.lon,
    dt: new Date(element.dt * 1000),
    dtRaw: element.dt,
    aqi: element.main.aqi,
    aqiName: names[element.main.aqi],
    components: { ...element.components },
  };
}

export default singleParser;
