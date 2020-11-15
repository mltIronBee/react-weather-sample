import axios, { AxiosPromise } from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const instance = axios.create({
	baseURL: "api.openweathermap.org/data/2.5",
});

export interface IGetForecastResponse {
	city: {
		id: number;
		name: string;
		coord: {
			lon: number;
			lat: number;
		};
		country: string;
		population: number;
		timezone: number;
	};
	cod: string;
	message: number;
	cnt: number;
	list: {
		dt: number;
		sunrise: number;
		sunset: number;
		temp: {
			day: number;
			min: number;
			max: number;
			night: number;
			eve: number;
			morn: number;
		};
		// eslint-disable-next-line camelcase
		feels_like: {
			day: number;
			night: number;
			eve: number;
			morn: number;
		};
		pressure: number;
		humidity: number;
		weather: {
			id: number;
			main: string;
			description: string;
			icon: string;
		}[];

		speed: number;
		deg: number;
		clouds: number;
		pop: number;
	}[];
}

export const getForecast = (city: string | number): AxiosPromise<IGetForecastResponse> => {
	const searchKey = typeof city === "string" ? "q" : "id";

	return instance.get("/forecast/daily", {
		params: { [searchKey]: city, cnt: 7, units: "metric", appid: WEATHER_API_KEY },
	});
};
