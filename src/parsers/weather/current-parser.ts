import { CurrentWeather } from "types/index";

function currentParser(data: any): CurrentWeather {
  const w = data.current.weather[0];

  return {
    lat: data.lat,
    lon: data.lon,
    dt: new Date(data.current.dt * 1000),
    dtRaw: data.current.dt,
    timezone: data.timezone,
    timezoneOffset: data.timezone_offset,
    astronomical: {
      sunrise: new Date(data.current.sunrise * 1000),
      sunriseRaw: data.current.sunrise,
      sunset: new Date(data.current.sunset * 1000),
      sunsetRaw: data.current.sunset,
    },
    weather: {
      temp: { cur: data.current.temp },
      feelsLike: { cur: data.current.feels_like },
      pressure: data.current.pressure,
      humidity: data.current.humidity,
      dewPoint: data.current.dew_point,
      clouds: data.current.clouds,
      uvi: data.current.uvi,
      visibility: data.current.visibility,
      wind: {
        deg: data.current.wind_deg,
        gust: data.current.wind_gust,
        speed: data.current.wind_speed,
      },
      rain: data.current.rain ? data.current.rain["1h"] : 0,
      snow: data.current.snow ? data.current.snow["1h"] : 0,
      conditionId: w.weather.id,
      main: w.weather.main,
      description: w.weather.description,
      icon: {
        url: `http://openweathermap.org/img/wn/${w.weather.icon}@2x.png`,
        raw: w.weather.icon,
      },
    },
  };
}

export default currentParser;
