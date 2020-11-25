import { IDailyForecast } from "@redux/reducers/weather";

let testForecast: IDailyForecast[] = [];

export const _getWeatherForecastSpy = jest.fn();

export const getWeatherForecast = async (city: string | number): Promise<IDailyForecast[]> => {
	// For some reason, when trying to spy on manual mock, it completely overwrites implementation with no-op function
	// To prevent this, and to be able keep mocked implementation along with call history we're calling separate mock
	// function, which just keeps calling history, while mock implementation remains intact
	_getWeatherForecastSpy(city);
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
