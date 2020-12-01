import { DEFAULT_COORDS } from "@utils/test-utils";
import { IGetForecastResponse } from "@utils/weather-api";
import { AxiosPromise } from "axios";

let testData: IGetForecastResponse["daily"] = [];

export const _setMockData = (data: IGetForecastResponse["daily"]): void => {
	testData = data;
};

export const _clearMockData = (): void => {
	testData = [];
};

export const getForecast = async (lat: number, lon: number): Promise<AxiosPromise<IGetForecastResponse>> => {
	if (lat !== DEFAULT_COORDS.lat && lon !== DEFAULT_COORDS.lng) {
		throw new Error("Cannot fetch forecast");
	}

	const currentWeather = testData[0];

	/* eslint-disable camelcase */
	return {
		headers: {},
		config: {},
		status: 200,
		statusText: "OK",
		data: {
			lat: DEFAULT_COORDS.lat,
			lon: DEFAULT_COORDS.lng,
			current: {
				...currentWeather,
				temp: currentWeather.temp.day,
				feels_like: currentWeather.feels_like.day,
				rain: currentWeather.rain ? { "1h": currentWeather.rain / 24 } : void 0,
				snow: currentWeather.snow ? { "1h": currentWeather.snow / 24 } : void 0,
			},
			daily: testData,
			timezone: "Europe/Kyiv",
			timezone_offset: 7200,
		},
	};
	/* eslint-disable camelcase */
};
