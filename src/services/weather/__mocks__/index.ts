import { IDailyForecast } from "@src/redux/reducers/weather";

let testForecast: IDailyForecast[] = [];

export const getWeatherForecast = async (city: string | number): Promise<IDailyForecast[]> => {
	if (city === "invalid") {
		throw new Error("Cannot fetch forecast");
	}

	return testForecast;
};

export const _setMockData = (data: IDailyForecast[]): void => {
	testForecast = data;
};

export const _clearMockData = (): void => {
	testForecast = [];
};
