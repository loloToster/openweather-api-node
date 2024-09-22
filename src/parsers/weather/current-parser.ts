import { CurrentWeather } from "types/index";

function currentParser(data: any): CurrentWeather {
  const w = data.weather[0];

  return {
    lat: data.coord.lat,
    lon: data.coord.lon,
    dt: new Date(data.dt * 1000),
    dtRaw: data.dt,
    timezone: undefined,
    timezoneOffset: data.timezone,
    astronomical: {
      sunrise: new Date(data.sys.sunrise * 1000),
      sunriseRaw: data.sys.sunrise,
      sunset: new Date(data.sys.sunset * 1000),
      sunsetRaw: data.sys.sunset,
    },
    weather: {
      temp: { 
        cur: data.main.temp,
        min: data.main.temp_min,
        max: data.main.temp_max
      },
      feelsLike: { cur: data.main.feels_like },
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      dewPoint: data.dew_point, 
      clouds: data.clouds.all,
      uvi: data.uvi, 
      visibility: data.visibility,
      wind: {
        deg: data.wind.deg,
        gust: data.wind.gust,
        speed: data.wind.speed,
      },
      rain: data.rain ? data.rain["1h"] : 0,
      snow: data.snow ? data.snow["1h"] : 0,
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

export default currentParser;
