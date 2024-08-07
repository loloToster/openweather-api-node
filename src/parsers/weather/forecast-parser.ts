import { ForecastWeather } from "types/index";

function forecastParser(data: any, limit: number): ForecastWeather[] {
  if (!data.list) return [];

  let parsedForecast: ForecastWeather[] = [];

  for (let i = 0; i < limit && i < data.list.length; i++) {
    const element = data.list[i];
    const w = element.weather[0];

    parsedForecast.push({
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
      dt: new Date(element.dt * 1000),
      dtRaw: element.dt,
      timezone: undefined,
      timezoneOffset: data.city.timezone,
      astronomical: {
        sunrise: new Date(data.city.sunrise * 1000),
        sunriseRaw: data.city.sunrise,
        sunset: new Date(data.city.sunset * 1000),
        sunsetRaw: data.city.sunset,
      },
      weather: {
        temp: { cur: element.main.temp },
        feelsLike: { cur: element.main.feels_like },
        tempMin: element.main.temp_min,
        tempMax: element.main.temp_max,
        pressure: element.main.pressure,
        humidity: element.main.humidity,
        clouds: element.clouds.all,
        visibility: element.visibility,
        wind: {
          deg: element.wind.deg,
          gust: element.wind.gust,
          speed: element.wind.speed,
        },
        pop: element.pop,
        rain: element.rain ? element.rain["3h"] : 0,
        snow: element.snow ? element.snow["3h"] : 0,
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

  return parsedForecast;
}

export default forecastParser;
