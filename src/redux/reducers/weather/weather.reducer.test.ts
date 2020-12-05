import weatherReducer, {
	getForecastStart,
	getForecastSuccess,
	getForecastError,
	fetchWeatherForecast,
	IDailyForecast,
	IWeatherState,
	ICurrentWeather,
} from "@redux/reducers/weather";
import * as weatherApi from "@services/weather";
jest.mock("@services/weather");

describe("Weather", () => {
	const testCurrent: ICurrentWeather = {
		clouds: 0,
		date: Date.now(),
		feelsLike: 16,
		humidity: 80,
		pressure: 1000,
		sunrise: Date.now(),
		sunset: Date.now(),
		temperature: 20,
		uvIndex: 0.7,
		visibility: 10000,
		weather: {
			description: "clear sky",
			icon: "01d",
			id: 800,
			main: "Clear",
		},
		windDeg: 100,
		windSpeed: 5,
	};
	const testForecast: IDailyForecast[] = [
		{ dayOfWeek: "Monday", minTemperature: 0, maxTemperature: 20 },
		{ dayOfWeek: "Tuesday", minTemperature: 1, maxTemperature: 21 },
		{ dayOfWeek: "Wednesday", minTemperature: 2, maxTemperature: 22 },
		{ dayOfWeek: "Thursday", minTemperature: 3, maxTemperature: 23 },
		{ dayOfWeek: "Friday", minTemperature: 4, maxTemperature: 24 },
		{ dayOfWeek: "Saturday", minTemperature: 5, maxTemperature: 25 },
		{ dayOfWeek: "Sunday", minTemperature: 6, maxTemperature: 26 },
	];

	describe("Weather actions", () => {
		afterEach(() => {
			(weatherApi as any)._clearMockData();
		});

		it("Should correctly create weather/getForecastStart action", () => {
			const actual = getForecastStart();
			const expected = { type: "weather/getForecastStart" };

			expect(actual).toEqual(expected);
		});

		it("Should correctly create weather/getForecastSuccess action with payload", () => {
			const actual = getForecastSuccess({ current: testCurrent, forecast: testForecast });

			expect(actual.payload.current).toEqual(testCurrent);
			expect(actual.payload.forecast).toEqual(testForecast);
		});

		it("Should correctly create weather/getForecastError action with payload", () => {
			const testError = "Test error message";
			const actual = getForecastError(testError);

			expect(actual.payload).toEqual(testError);
		});

		it("Should dispatch correct actions for successful fetch of forecast", async () => {
			(weatherApi as any)._setMockData({ forecast: testForecast, current: testCurrent });
			const dispatchMock = jest.fn();
			const expectedFirstArgs = { type: "weather/getForecastStart" };
			const expectedSecondArgs = {
				type: "weather/getForecastSuccess",
				payload: { current: testCurrent, forecast: testForecast },
			};
			const action = fetchWeatherForecast("Odesa");

			await action(dispatchMock, () => ({ weather: { isLoading: false, current: null, forecast: [] } }), {});

			expect(dispatchMock).toBeCalledTimes(2);
			expect(dispatchMock.mock.calls[0][0]).toEqual(expectedFirstArgs);
			expect(dispatchMock.mock.calls[1][0]).toEqual(expectedSecondArgs);
		});

		it("Should dispatch correct actions for failed fetch of forecast", async () => {
			const dispatchMock = jest.fn();
			const expectedFirstArgs = { type: "weather/getForecastStart" };
			const expectedSecondArgs = { type: "weather/getForecastError", payload: "Error: Cannot fetch forecast" };
			const action = fetchWeatherForecast("invalid");

			await action(dispatchMock, () => ({ weather: { isLoading: false, current: null, forecast: [] } }), "");

			expect(dispatchMock).toBeCalledTimes(2);
			expect(dispatchMock.mock.calls[0][0]).toEqual(expectedFirstArgs);
			expect(dispatchMock.mock.calls[1][0]).toEqual(expectedSecondArgs);
		});
	});

	describe("Weather reducer", () => {
		it("Should return initial state", () => {
			const actual = weatherReducer(undefined, { type: "" });
			const expected: IWeatherState = {
				isLoading: false,
				forecast: [],
				current: null,
				errorMessage: "",
			};

			expect(actual).toEqual(expected);
		});

		it("Should correctly process getForecastStart action", () => {
			const testAction = { type: "weather/getForecastStart" };
			const expected: IWeatherState = {
				isLoading: true,
				current: null,
				forecast: [],
				errorMessage: "",
			};
			const actual = weatherReducer(undefined, testAction);

			expect(actual).toEqual(expected);
		});

		it("Should correctly process getForecastSuccess action", () => {
			const testAction = {
				type: "weather/getForecastSuccess",
				payload: { current: testCurrent, forecast: testForecast },
			};
			const expected: IWeatherState = {
				isLoading: false,
				current: testCurrent,
				forecast: testForecast,
				errorMessage: "",
			};
			const initialState: IWeatherState = {
				isLoading: true,
				current: null,
				forecast: [],
				errorMessage: "",
			};
			const actual = weatherReducer(initialState, testAction);

			expect(actual).toEqual(expected);
		});

		it("Should correctly process getForecastError action", () => {
			const testError = "Test error";
			const testAction = { type: "weather/getForecastError", payload: testError };
			const expected: IWeatherState = {
				isLoading: false,
				current: null,
				forecast: [],
				errorMessage: testError,
			};
			const initialState: IWeatherState = {
				isLoading: true,
				current: null,
				forecast: [],
				errorMessage: "",
			};
			const actual = weatherReducer(initialState, testAction);

			expect(actual).toEqual(expected);
		});
	});
});
