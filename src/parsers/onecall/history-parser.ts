import { HistoricalWeather } from "types/index";

function historicalParser(data: any): HistoricalWeather {
  const d = data.data[0];
  const w = d.weather[0];

  return {
    lat: data.lat,
    lon: data.lon,
    dt: new Date(d.dt * 1000),
    dtRaw: d.dt,
    timezone: data.timezone,
    timezoneOffset: data.timezone_offset,
    astronomical: {
      sunrise: new Date(d.sunrise * 1000),
      sunriseRaw: d.sunrise,
      sunset: new Date(d.sunset * 1000),
      sunsetRaw: d.sunset,
    },
    weather: {
      temp: { cur: d.temp },
      feelsLike: { cur: d.feels_like },
      pressure: d.pressure,
      humidity: d.humidity,
      dewPoint: d.dew_point,
      clouds: d.clouds,
      uvi: d.uvi,
      visibility: d.visibility,
      wind: {
        deg: d.wind_deg,
        gust: d.wind_gust,
        speed: d.wind_speed,
      },
      rain: d.rain ? d.rain["1h"] : 0,
      snow: d.snow ? d.snow["1h"] : 0,
      conditionId: w.id,
      main: w.main,
      description: w.description,
      icon: {
        url: `http://openweathermap.org/img/wn/${w.icon}@2x.png`,
        raw: w.icon,
      },
    },
  };
}

export default historicalParser;
