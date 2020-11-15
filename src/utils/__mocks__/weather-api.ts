import { IGetForecastResponse } from "@src/utils/weather-api";
import { AxiosPromise } from "axios";

let testData: IGetForecastResponse["list"] = [];

export const _setMockData = (data: IGetForecastResponse["list"]): void => {
	testData = data;
};

export const _clearMockData = (): void => {
	testData = [];
};

export const getForecast = async (city: string | number): Promise<AxiosPromise<IGetForecastResponse>> => {
	if (city === "invalid") {
		throw new Error("Cannot fetch forecast");
	}

	return {
		headers: {},
		config: {},
		status: 200,
		statusText: "OK",
		data: {
			city: {
				coord: {
					lat: 0,
					lon: 0,
				},
				country: "test",
				id: 0,
				name: "test",
				population: 0,
				timezone: 0,
			},
			cnt: 1,
			cod: "200",
			list: testData,
			message: 0,
		},
	};
};
