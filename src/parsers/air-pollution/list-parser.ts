import { AirPollution } from "types/air-pollution";

const names = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

function listParser(data: any, limit: number): AirPollution[] {
  if (!data.list) return [];

  let parsedList: AirPollution[] = [];

  for (let i = 0; i < limit && i < data.list.length; i++) {
    const element = data.list[i];

    parsedList.push({
      lat: data.coord.lat,
      lon: data.coord.lon,
      dt: new Date(element.dt * 1000),
      dtRaw: element.dt,
      aqi: element.main.aqi,
      aqiName: names[element.main.aqi],
      components: { ...element.components },
    });
  }

  return parsedList;
}

export default listParser;
