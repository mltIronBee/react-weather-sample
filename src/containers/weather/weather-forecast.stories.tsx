import React, { ComponentProps } from "react";
import { Provider } from "react-redux";
import { Story } from "@storybook/react/types-6-0";
import { WeatherForecast } from "@containers/weather";
import { SnackbarProvider } from "@containers/snackbar";
import createStore from "@redux/store";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AppActions, IAppState } from "@redux/reducers";
import { DateTime } from "luxon";
import { DEFAULT_COORDS } from "@utils/test-utils";

const Template: Story<ComponentProps<typeof WeatherForecast> & { store: EnhancedStore<IAppState, AppActions> }> = (
	props,
) => (
	<Provider store={props.store}>
		<WeatherForecast />
	</Provider>
);

const weatherData = {
	errorMessage: "",
	current: {
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
	},
	forecast: [
		{ dayOfWeek: DateTime.local().set({ weekday: 1 }).toMillis(), minTemperature: -5, maxTemperature: -1 },
		{ dayOfWeek: DateTime.local().set({ weekday: 2 }).toMillis(), minTemperature: -3, maxTemperature: 11 },
		{ dayOfWeek: DateTime.local().set({ weekday: 3 }).toMillis(), minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: DateTime.local().set({ weekday: 4 }).toMillis(), minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: DateTime.local().set({ weekday: 5 }).toMillis(), minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: DateTime.local().set({ weekday: 6 }).toMillis(), minTemperature: 2, maxTemperature: 8 },
		{ dayOfWeek: DateTime.local().set({ weekday: 7 }).toMillis(), minTemperature: 1, maxTemperature: 8 },
	],
};

const defaultStore = createStore();
const loadingStore = createStore({
	geolocation: { lat: null, lng: null },
	weather: { isLoading: true, current: null, forecast: [], errorMessage: "" },
});
const errorStore = createStore({
	geolocation: { lat: null, lng: null },
	weather: { isLoading: false, current: null, forecast: [], errorMessage: "Error: Failed to fetch forecast" },
});
const loadedStore = createStore({
	geolocation: {
		lat: DEFAULT_COORDS.lat,
		lng: DEFAULT_COORDS.lng,
	},
	weather: {
		...weatherData,
		isLoading: false,
	},
});

const loadingWithDataStore = createStore({
	geolocation: {
		lat: DEFAULT_COORDS.lat,
		lng: DEFAULT_COORDS.lng,
	},
	weather: {
		...weatherData,
		isLoading: true,
	},
});

export const WithoutData = Template.bind({});

WithoutData.args = {
	store: defaultStore,
};

export const Loading = Template.bind({});

Loading.args = {
	store: loadingStore,
};

export const LoadingWithData = Template.bind({});

LoadingWithData.args = {
	store: loadingWithDataStore,
};

export const WithError = Template.bind({});

WithError.args = {
	store: errorStore,
};

export const Loaded = Template.bind({});

Loaded.args = {
	store: loadedStore,
};

export default {
	title: "Weather Forecast container",
	component: WeatherForecast,
	decorators: [
		(Story: React.ComponentType): JSX.Element => (
			<SnackbarProvider>
				<Story />
			</SnackbarProvider>
		),
	],
};
