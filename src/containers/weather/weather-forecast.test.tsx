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

jest.mock("recharts");
jest.mock("@services/weather");
jest.mock("@containers/snackbar/snackbar-context");

describe("Weather forecast container", () => {
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
				(weatherService as any)._setMockData(testData);
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
					{ type: "weather/getForecastSuccess", payload: testData },
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity);
				expect(actualActions).toEqual(expectedActions);
			});

			it("Should allow user to enter city for search and get forecast by pressing enter", async () => {
				const store = configureStore<IAppState, AppActions>(middleware)({
					weather: {
						isLoading: false,
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
					{ type: "weather/getForecastSuccess", payload: testData },
				];
				const actualActions = store.getActions();

				expect(weatherServiceSpy).toBeCalledWith(testCity);
				expect(actualActions).toEqual(expectedActions);
			});

			it("Should dispatch an error message, when user fails to get a forecast", async () => {
				const store = configureStore<IAppState>(middleware)({
					weather: {
						isLoading: false,
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
						forecast: [],
						errorMessage: "",
					},
				});
				const errorStore = createStore({
					weather: {
						isLoading: false,
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
	});
});
