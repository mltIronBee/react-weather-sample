import { createReducer } from "@reduxjs/toolkit";

export interface IDailyForecast {
	readonly minTemperature: number;
	readonly maxTemperature: number;
	readonly dayOfWeek: number;
}

export interface IWeatherState {
	readonly isLoading: boolean;
	readonly errorMessage?: string;
	readonly forecast: IDailyForecast[];
}

const initialState: IWeatherState = {
	forecast: [],
	isLoading: false,
	errorMessage: "",
};

export const weatherReducer = createReducer(initialState, {});
