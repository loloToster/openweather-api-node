import { DailyWeather } from "types/index";

function dailyParser(data: any, limit: number): DailyWeather[] {
  if (!data.daily) return [];

  let parsedDaily: DailyWeather[] = [];

  for (let i = 0; i < limit && i < data.daily.length; i++) {
    const element = data.daily[i];
    const w = element.weather[0];

    parsedDaily.push({
      lat: data.lat,
      lon: data.lon,
      dt: new Date(element.dt * 1000),
      dtRaw: element.dt,
      timezone: data.timezone,
      timezoneOffset: data.timezone_offset,
      astronomical: {
        sunrise: new Date(element.sunrise * 1000),
        sunriseRaw: element.sunrise,
        sunset: new Date(element.sunset * 1000),
        sunsetRaw: element.sunset,
        moonrise: new Date(element.moonrise * 1000),
        moonriseRaw: element.moonrise,
        moonset: new Date(element.moonset * 1000),
        moonsetRaw: element.moonset,
        moonPhase: element.moon_phase,
      },
      weather: {
        temp: {
          morn: element.temp.morn,
          day: element.temp.day,
          eve: element.temp.eve,
          night: element.temp.night,
          min: element.temp.min,
          max: element.temp.max,
        },
        feelsLike: {
          day: element.feels_like.day,
          night: element.feels_like.night,
          eve: element.feels_like.eve,
          morn: element.feels_like.morn,
        },
        pressure: element.pressure,
        humidity: element.humidity,
        dewPoint: element.dew_point,
        clouds: element.clouds,
        uvi: element.uvi,
        wind: {
          deg: element.wind_deg,
          gust: element.wind_gust,
          speed: element.wind_speed,
        },
        pop: element.pop,
        rain: element.rain ? element.rain : 0,
        snow: element.snow ? element.snow : 0,
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

  return parsedDaily;
}

export default dailyParser;
