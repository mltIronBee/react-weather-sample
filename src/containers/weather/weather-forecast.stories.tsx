import React, { ComponentProps } from "react";
import { Provider } from "react-redux";
import { Story } from "@storybook/react/types-6-0";
import { WeatherForecast } from "@containers/weather";
import { SnackbarProvider } from "@containers/snackbar";
import createStore from "@redux/store";
import { EnhancedStore } from "@reduxjs/toolkit";
import { AppActions, IAppState } from "@redux/reducers";

const Template: Story<ComponentProps<typeof WeatherForecast> & { store: EnhancedStore<IAppState, AppActions> }> = (
	props,
) => (
	<Provider store={props.store}>
		<WeatherForecast />
	</Provider>
);

const defaultStore = createStore();
const loadingStore = createStore({ weather: { isLoading: true, forecast: [], errorMessage: "" } });
const errorStore = createStore({
	weather: { isLoading: false, forecast: [], errorMessage: "Error: Failed to fetch forecast" },
});
const loadedStore = createStore({
	weather: {
		isLoading: false,
		errorMessage: "",
		forecast: [
			{ dayOfWeek: "Monday", minTemperature: -5, maxTemperature: -1 },
			{ dayOfWeek: "Tuesday", minTemperature: -3, maxTemperature: 11 },
			{ dayOfWeek: "Wednesday", minTemperature: 4, maxTemperature: 9 },
			{ dayOfWeek: "Thursday", minTemperature: 4, maxTemperature: 9 },
			{ dayOfWeek: "Friday", minTemperature: 4, maxTemperature: 9 },
			{ dayOfWeek: "Saturday", minTemperature: 2, maxTemperature: 8 },
			{ dayOfWeek: "Sunday", minTemperature: 1, maxTemperature: 8 },
		],
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
