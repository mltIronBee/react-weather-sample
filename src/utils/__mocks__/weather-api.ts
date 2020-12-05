import { DEFAULT_COORDS } from "@utils/test-utils";
import { IGetForecastResponse } from "@utils/weather-api";
import { AxiosPromise } from "axios";

/* eslint-disable camelcase */
let testCurrent: IGetForecastResponse["current"] = {
	clouds: 0,
	dew_point: 0,
	dt: 0,
	feels_like: 0,
	humidity: 0,
	pressure: 0,
	sunrise: 0,
	sunset: 0,
	temp: 0,
	uvi: 0,
	visibility: 0,
	weather: [
		{
			description: "clear sky",
			icon: "01d",
			id: 800,
			main: "Clear",
		},
	],
	wind_deg: 0,
	wind_speed: 0,
};
/* eslint-enable camelcase */
let testData: IGetForecastResponse["daily"] = [];

export const _setMockData = (data: {
	current?: IGetForecastResponse["current"];
	forecast?: IGetForecastResponse["daily"];
}): void => {
	if (data.forecast) {
		testData = data.forecast;
	}
	if (data.current) {
		testCurrent = data.current;
	}
};

export const _clearMockData = (): void => {
	testData = [];
};

export const getForecast = async (lat: number, lon: number): Promise<AxiosPromise<IGetForecastResponse>> => {
	if (lat !== DEFAULT_COORDS.lat && lon !== DEFAULT_COORDS.lng) {
		throw new Error("Cannot fetch forecast");
	}

	/* eslint-disable camelcase */
	return {
		headers: {},
		config: {},
		status: 200,
		statusText: "OK",
		data: {
			lat: DEFAULT_COORDS.lat,
			lon: DEFAULT_COORDS.lng,
			current: testCurrent,
			daily: testData,
			timezone: "Europe/Kyiv",
			timezone_offset: 7200,
		},
	};
	/* eslint-disable camelcase */
};
