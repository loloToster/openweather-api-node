import { HourlyWeather } from "types/index";

function hourlyParser(data: any, limit: number): HourlyWeather[] {
  if (!data.hourly) return [];

  let parsedHourly: HourlyWeather[] = [];

  for (let i = 0; i < limit && i < data.hourly.length; i++) {
    const element = data.hourly[i];
    const w = element.weather[0];

    parsedHourly.push({
      lat: data.lat,
      lon: data.lon,
      dt: new Date(element.dt * 1000),
      dtRaw: element.dt,
      timezone: data.timezone,
      timezoneOffset: data.timezone_offset,
      astronomical: {},
      weather: {
        temp: { cur: element.temp },
        feelsLike: { cur: element.temp }, // ! ?
        pressure: element.pressure,
        humidity: element.humidity,
        dewPoint: element.dew_point,
        clouds: element.clouds,
        uvi: element.uvi,
        visibility: element.visibility,
        wind: {
          deg: element.wind_deg,
          gust: element.wind_gust,
          speed: element.wind_speed,
        },
        pop: element.pop,
        rain: element.rain ? element.rain["1h"] : 0,
        snow: element.snow ? element.snow["1h"] : 0,
        conditionId: w.id,
        main: w.main,
        description: w.description,
        icon: {
          url: `http://openweathermap.org/img/wn/${w.icon}@2x.png`,
          raw: w.icon,
        },
      },
    });
  }

  return parsedHourly;
}

export default hourlyParser;
