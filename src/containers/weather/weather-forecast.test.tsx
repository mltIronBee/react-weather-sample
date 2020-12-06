import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { render, screen, fireEvent, waitFor } from "@utils/test-utils";
import { WeatherForecast } from "@containers/weather/weather-forecast";
import * as SnackbarApi from "@containers/snackbar";
import { AppActions, IAppState } from "@redux/reducers";
import { IForecastGraphProps } from "@components/weather/forecast-graph";
import * as weatherService from "@services/weather";
import * as geolocationService from "@services/geolocation";
import { ICurrentWeather } from "@redux/reducers/weather";

jest.mock("recharts");
jest.mock("@services/weather");
jest.mock("@containers/snackbar/snackbar-context");

describe("Weather forecast container", () => {
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
	const testData: IForecastGraphProps["data"] = [
		{ dayOfWeek: "Monday", minTemperature: 5, maxTemperature: 13 },
		{ dayOfWeek: "Tuesday", minTemperature: 3, maxTemperature: 11 },
		{ dayOfWeek: "Wednesday", minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: "Thursday", minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: "Friday", minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: "Saturday", minTemperature: 2, maxTemperature: 8 },
		{ dayOfWeek: "Sunday", minTemperature: 1, maxTemperature: 8 },
	];

	describe("Rendering", () => {
		const middleware = getDefaultMiddleware({ thunk: true });

		it("Should render correctly", () => {
			const store = configureStore<IAppState>()({
				weather: {
					isLoading: false,
					current: testCurrent,
					forecast: testData,
					errorMessage: "",
				},
			});

			const { container } = render(
				<Provider store={store}>
					<WeatherForecast />
				</Provider>,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		describe("Weather search flow", () => {
			const weatherServiceSpy = (weatherService as any)._getWeatherForecastSpy as jest.Mock;

			beforeAll(() => {
				(weatherService as any)._setMockData({ current: testCurrent, forecast: testData });
			});

			afterAll(() => {
				(weatherService as any)._clearMockData();
			});

			afterEach(() => {
				weatherServiceSpy.mockClear();
				(SnackbarApi as any)._resetHistory();
			});

			it("Should allow user to enter city for search and get forecast by clicking search icon", async () => {
				const store = configureStore<IAppState, AppActions>(middleware)({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: "",
					},
				});
				const testCity = "Odesa";

				render(
					<Provider store={store}>
						<WeatherForecast />
					</Provider>,
				);

				fireEvent.change(screen.getByLabelText(/^search city$/i), { target: { value: testCity } });
				fireEvent.click(screen.getByLabelText(/^search$/i));

				await waitFor(() => screen.findByLabelText(/^Search$/i));

				const expectedActions = [
					{ type: "weather/getForecastStart" },
					{ type: "weather/getForecastSuccess", payload: { current: testCurrent, forecast: testData } },
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity);
				expect(actualActions).toEqual(expectedActions);
			});

			it("Should allow user to enter city for search and get forecast by pressing enter", async () => {
				const store = configureStore<IAppState, AppActions>(middleware)({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: "",
					},
				});
				const testCity = "Odesa";

				render(
					<Provider store={store}>
						<WeatherForecast />
					</Provider>,
				);

				const searchInput = screen.getByLabelText(/^search city$/i);

				fireEvent.click(searchInput);
				fireEvent.change(searchInput, { target: { value: testCity } });
				fireEvent.submit(searchInput);

				await new Promise((resolve) => setTimeout(resolve, 0));

				const expectedActions = [
					{ type: "weather/getForecastStart" },
					{ type: "weather/getForecastSuccess", payload: { current: testCurrent, forecast: testData } },
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity);
				expect(actualActions).toEqual(expectedActions);
			});

			it("Should dispatch an error message, when user fails to get a forecast", async () => {
				const store = configureStore<IAppState>(middleware)({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: "",
					},
				});
				const testCity = "invalid";

				render(
					<Provider store={store}>
						<WeatherForecast />
					</Provider>,
				);

				fireEvent.change(screen.getByPlaceholderText(/^Enter city to search$/i), { target: { value: testCity } });
				fireEvent.click(screen.getByLabelText(/^search$/i));

				await waitFor(() => screen.findByLabelText(/^Search$/i));

				const expectedActions = [
					{ type: "weather/getForecastStart" },
					{ type: "weather/getForecastError", payload: "Error: Cannot fetch forecast" },
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity);
				expect(actualActions).toEqual(expectedActions);
			});

			it("Should show a toast with error when user fails to fetch forecast", async () => {
				const createStore = configureStore<IAppState>(middleware);
				const testError = "Test error message";
				const initialStore = createStore({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: "",
					},
				});
				const errorStore = createStore({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: testError,
					},
				});

				const { SnackbarProvider, _showMock, _errorMock } = SnackbarApi as any;

				const { rerender } = render(
					<Provider store={initialStore}>
						<SnackbarProvider>
							<WeatherForecast />
						</SnackbarProvider>
					</Provider>,
				);

				expect(() => screen.getByText(testError)).toThrow();

				rerender(
					<Provider store={errorStore}>
						<SnackbarProvider>
							<WeatherForecast />
						</SnackbarProvider>
					</Provider>,
				);

				try {
					expect(_showMock).toBeCalledWith(testError, "error");
				} catch (e) {
					expect(_errorMock).toBeCalledWith(testError);
				}
			});
		});

		describe("Geolocation flow", () => {
			const createStore = configureStore<IAppState>(middleware);
			const store = createStore({
				weather: {
					isLoading: false,
					current: null,
					forecast: [],
					errorMessage: "",
				},
			});
			const getLocationSpy = jest.spyOn(geolocationService, "getCurrentLocation");
			const oldGeolocation = global.navigator.geolocation;
			const { SnackbarProvider, _showMock, _errorMock, _resetHistory } = SnackbarApi as any;

			beforeAll(() => {
				(global.navigator as any).geolocation = {
					getCurrentPosition: jest.fn(),
				};
			});

			beforeEach(() => {
				getLocationSpy.mockReset();
				_resetHistory();
			});

			afterAll(() => {
				(global.navigator as any).geolocation = oldGeolocation;
				getLocationSpy.mockRestore();
			});

			it("Should use geolocation feature to retrieve users location and put it to the search field", async () => {
				const testLocation = "Test location, Test city";

				render(
					<Provider store={store}>
						<SnackbarProvider>
							<WeatherForecast />
						</SnackbarProvider>
					</Provider>,
				);

				getLocationSpy.mockImplementationOnce(() =>
					Promise.resolve({ location: testLocation, coordinates: { lat: 40, lng: 30 } }),
				);

				fireEvent.click(screen.getByLabelText(/^get current location$/i));

				const searchInput = await waitFor(() => screen.findByLabelText(/^search city$/i));

				expect(searchInput).toHaveValue(testLocation);
			});

			it("Should display error message, if error occurred during geolocation retrieval", async () => {
				render(
					<Provider store={store}>
						<SnackbarProvider>
							<WeatherForecast />
						</SnackbarProvider>
					</Provider>,
				);

				const testMessage = "Test network error";

				getLocationSpy.mockImplementationOnce(() => Promise.reject({ isAxiosError: true, message: testMessage }));

				const geolocationSearchButton = screen.getByLabelText(/^get current location$/i);

				fireEvent.click(geolocationSearchButton);

				await waitFor(() => {
					try {
						expect(_showMock).toBeCalledWith(testMessage, "error");
					} catch (_) {
						expect(_errorMock).toBeCalledWith(testMessage);
					}
				});

				expect(geolocationSearchButton).not.toBeDisabled();
			});

			it("Should disable geolocation search, if permission was declined or geolocation is failing", async () => {
				render(
					<Provider store={store}>
						<SnackbarProvider>
							<WeatherForecast />
						</SnackbarProvider>
					</Provider>,
				);

				const testMessage = "Test geolocation error";

				getLocationSpy.mockImplementationOnce(() => Promise.reject({ message: testMessage }));

				const geolocationSearchButton = screen.getByLabelText(/^get current location$/i);

				fireEvent.click(geolocationSearchButton);

				await waitFor(() => {
					try {
						expect(_showMock).toBeCalledWith(testMessage, "error");
					} catch (_) {
						expect(_errorMock).toBeCalledWith(testMessage);
					}
				});

				expect(geolocationSearchButton).toBeDisabled();
			});
		});

		describe("Controls appearance", () => {
			it("Should disable current weather tab, when current weather is not loaded", () => {
				const createStore = configureStore<IAppState>(middleware);
				const store = createStore({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: "",
					},
				});

				render(
					<Provider store={store}>
						<WeatherForecast />
					</Provider>,
				);

				expect(screen.getByLabelText(/^current weather tab$/i)).toBeDisabled();
			});
		});
	});
});
