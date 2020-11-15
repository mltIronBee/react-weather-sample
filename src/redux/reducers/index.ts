import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer, { IWeatherState, WeatherActions } from "@redux/reducers/weather";

export interface IAppState {
	weather: IWeatherState;
}

export type AppActions = WeatherActions;

export const rootReducer = combineReducers({ weather: weatherReducer });

export type RootReducer = ReturnType<typeof rootReducer>;
