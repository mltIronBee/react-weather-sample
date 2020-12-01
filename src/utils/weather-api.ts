import axios, { AxiosPromise } from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const instance = axios.create({
	baseURL: "https://api.openweathermap.org/data/2.5",
});

export interface IDailyTemperature {
	morn: number;
	day: number;
	eve: number;
	night: number;
	min: number;
	max: number;
}

/* eslint-disable camelcase */
export interface IGetForecastResponse {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: {
		dt: number;
		sunrise: number;
		sunset: number;
		temp: number;
		feels_like: number;
		pressure: number;
		humidity: number;
		dew_point: number;
		clouds: number;
		uvi: number;
		visibility: number;
		wind_speed: number;
		wind_gust?: number;
		wind_deg: number;
		rain?: {
			"1h": number;
		};
		snow?: {
			"1h": number;
		};
		weather: {
			id: number;
			main: string;
			description: string;
			icon: string;
		}[];
	};
	daily: {
		dt: number;
		sunrise: number;
		sunset: number;
		temp: IDailyTemperature;
		feels_like: Omit<IDailyTemperature, "min" | "max">;
		pressure: number;
		humidity: number;
		dew_point: number;
		wind_speed: number;
		wind_gust?: number;
		wind_deg: number;
		clouds: number;
		uvi: number;
		visibility: number;
		pop: number;
		rain?: number;
		snow?: number;
		weather: {
			id: number;
			main: string;
			description: string;
			icon: string;
		}[];
	}[];
}
/* eslint-enable camelcase */

export const getForecast = (lat: number, lon: number): AxiosPromise<IGetForecastResponse> =>
	instance.get("/onecall", {
		params: { lat, lon, units: "metric", exclude: "minutely,hourly,alerts", appid: WEATHER_API_KEY },
	});

export const getWeatherIcon = (icon: string): string => `http://openweathermap.org/img/wn/${icon}@2x.png`;
