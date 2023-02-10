import { MinutelyWeather } from "types/index";

function minutelyParser(data: any, limit: number): MinutelyWeather[] {
  if (!data.minutely) return [];

  let parsedMinutely: MinutelyWeather[] = [];

  for (let i = 0; i < limit && i < data.minutely.length; i++) {
    const element = data.minutely[i];

    parsedMinutely.push({
      lat: data.lat,
      lon: data.lon,
      dt: new Date(element.dt * 1000),
      dtRaw: element.dt,
      timezone: data.timezone,
      timezoneOffset: data.timezone_offset,
      weather: {
        rain: element.precipitation,
        feelsLike: {},
        icon: {},
        temp: {},
        wind: {},
      },
      astronomical: {},
    });
  }

  return parsedMinutely;
}

export default minutelyParser;
