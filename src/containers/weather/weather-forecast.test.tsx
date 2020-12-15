import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { render, screen, fireEvent, waitFor, DEFAULT_COORDS } from "@utils/test-utils";
import { WeatherForecast } from "@containers/weather/weather-forecast";
import * as SnackbarApi from "@containers/snackbar";
import { AppActions, IAppState } from "@redux/reducers";
import { IForecastGraphProps } from "@components/weather/forecast-graph";
import * as weatherService from "@services/weather";
import * as geolocationService from "@services/geolocation";
import { ICurrentWeather } from "@redux/reducers/weather";
import * as reactI18next from "react-i18next";

jest.mock("recharts");
jest.mock("@services/weather");
jest.mock("@containers/snackbar/snackbar-context");
jest.mock("react-i18next");

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
		{ dayOfWeek: 1, minTemperature: 5, maxTemperature: 13 },
		{ dayOfWeek: 2, minTemperature: 3, maxTemperature: 11 },
		{ dayOfWeek: 3, minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: 4, minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: 5, minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: 6, minTemperature: 2, maxTemperature: 8 },
		{ dayOfWeek: 7, minTemperature: 1, maxTemperature: 8 },
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
				geolocation: {
					lat: DEFAULT_COORDS.lat,
					lng: DEFAULT_COORDS.lng,
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
					geolocation: {
						lat: null,
						lng: null,
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
					{
						type: "geolocation/getCurrentLocationSuccess",
						payload: { lat: DEFAULT_COORDS.lat, lng: DEFAULT_COORDS.lng },
					},
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity, "en");
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
					geolocation: {
						lat: null,
						lng: null,
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
					{
						type: "geolocation/getCurrentLocationSuccess",
						payload: { lat: DEFAULT_COORDS.lat, lng: DEFAULT_COORDS.lng },
					},
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity, "en");
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
					geolocation: {
						lat: null,
						lng: null,
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

				expect(weatherServiceSpy).toBeCalledWith(testCity, "en");
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
					geolocation: {
						lat: null,
						lng: null,
					},
				});
				const errorStore = createStore({
					weather: {
						isLoading: false,
						current: null,
						forecast: [],
						errorMessage: testError,
					},
					geolocation: {
						lat: null,
						lng: null,
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
				geolocation: {
					lat: null,
					lng: null,
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

				fireEvent.click(screen.getByLabelText(/^use current location$/i));

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

				const geolocationSearchButton = screen.getByLabelText(/^use current location$/i);

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

				const geolocationSearchButton = screen.getByLabelText(/^use current location$/i);

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

		describe("Re-fetching data on language changes", () => {
			beforeEach(() => {
				(reactI18next as any)._resetLanguage();
			});

			it("Should re-fetch weather data, if language was changed, and already loaded current weather", async () => {
				const createStore = configureStore<IAppState>(middleware);
				const testStore = createStore({
					weather: {
						isLoading: false,
						errorMessage: "",
						forecast: [],
						current: {
							clouds: 0,
							date: Date.now(),
							feelsLike: 0,
							humidity: 0,
							pressure: 0,
							sunrise: Date.now(),
							sunset: Date.now(),
							temperature: 0,
							uvIndex: 0,
							visibility: 0,
							weather: {
								id: 0,
								description: "clear sky",
								icon: "01d",
								main: "Clear",
							},
							windDeg: 0,
							windSpeed: 0,
						},
					},
					geolocation: {
						lat: DEFAULT_COORDS.lat,
						lng: DEFAULT_COORDS.lng,
					},
				});

				const { rerender } = render(
					<Provider store={testStore}>
						<WeatherForecast />
					</Provider>,
				);

				const newLang = "uk";

				(reactI18next as any)._changeLanguage(newLang);

				rerender(
					<Provider store={testStore}>
						<WeatherForecast />
					</Provider>,
				);

				await waitFor(() =>
					expect((weatherService as any)._getWeatherForecastSpy).toBeCalledWith(DEFAULT_COORDS, newLang),
				);
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
					geolocation: {
						lat: null,
						lng: null,
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
