import { ICurrentWeather, IDailyForecast } from "@redux/reducers/weather";
import { IWeatherForecastResponse } from "@services/weather";

let testCurrent: ICurrentWeather = {
	clouds: 0,
	date: 0,
	feelsLike: 0,
	humidity: 0,
	pressure: 0,
	sunrise: 0,
	sunset: 0,
	temperature: 0,
	uvIndex: 0,
	visibility: 0,
	weather: {
		description: "clear sky",
		icon: "01d",
		id: 800,
		main: "Clear",
	},
	windDeg: 0,
	windSpeed: 0,
};
let testForecast: IDailyForecast[] = [];

export const _getWeatherForecastSpy = jest.fn();

export const getWeatherForecast = async (city: string | number): Promise<IWeatherForecastResponse> => {
	// For some reason, when trying to spy on manual mock, it completely overwrites implementation with no-op function
	// To prevent this, and to be able keep mocked implementation along with call history we're calling separate mock
	// function, which just keeps calling history, while mock implementation remains intact
	_getWeatherForecastSpy(city);
	if (city === "invalid") {
		throw new Error("Cannot fetch forecast");
	}

	return { current: testCurrent, forecast: testForecast };
};

export const _setMockData = (data: { forecast?: IDailyForecast[]; current?: ICurrentWeather }): void => {
	if (data.forecast) {
		testForecast = data.forecast;
	}
	if (data.current) {
		testCurrent = data.current;
	}
};

export const _clearMockData = (): void => {
	testForecast = [];
	testCurrent = {
		clouds: 0,
		date: 0,
		feelsLike: 0,
		humidity: 0,
		pressure: 0,
		sunrise: 0,
		sunset: 0,
		temperature: 0,
		uvIndex: 0,
		visibility: 0,
		weather: {
			description: "clear sky",
			icon: "01d",
			id: 800,
			main: "Clear",
		},
		windDeg: 0,
		windSpeed: 0,
	};
};
