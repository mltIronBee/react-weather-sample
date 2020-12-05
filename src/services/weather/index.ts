import { DateTime } from "luxon";
import { ICurrentWeather, IDailyForecast } from "@redux/reducers/weather";
import * as geolocationApi from "@utils/geolocation-api";
import * as weatherApi from "@utils/weather-api";

export interface IWeatherForecastResponse {
	current: ICurrentWeather;
	forecast: IDailyForecast[];
}

export const getWeatherForecast = async (city: string): Promise<IWeatherForecastResponse> => {
	const geolocationResponse = await geolocationApi.search(city);

	const coordinates = { lat: geolocationResponse.data[0].lat, lng: geolocationResponse.data[0].lon };

	const {
		data: { current, daily },
	} = await weatherApi.getForecast(+coordinates.lat, +coordinates.lng);

	return {
		current: {
			clouds: current.clouds,
			date: current.dt * 1000,
			feelsLike: current.feels_like,
			humidity: current.humidity,
			pressure: current.pressure,
			rain: current.rain?.["1h"],
			snow: current.snow?.["1h"],
			sunrise: current.sunrise * 1000,
			sunset: current.sunset * 1000,
			temperature: current.temp,
			uvIndex: current.uvi,
			visibility: current.visibility,
			weather: current.weather[0],
			windDeg: current.wind_deg,
			windSpeed: current.wind_speed,
		},
		forecast: daily.map((item) => ({
			dayOfWeek: DateTime.fromMillis(item.dt * 1000).weekdayLong,
			minTemperature: item.temp.min,
			maxTemperature: item.temp.max,
		})),
	};
};
