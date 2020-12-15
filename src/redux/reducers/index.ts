/* istanbul ignore file */
import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer, { IWeatherState, WeatherActions } from "@redux/reducers/weather";
import geolocationReducer, { GeolocationActions, IGeolcationState } from "@redux/reducers/geolocation";

export interface IAppState {
	weather: IWeatherState;
	geolocation: IGeolcationState;
}

export type AppActions = WeatherActions | GeolocationActions;

export const rootReducer = combineReducers({ weather: weatherReducer, geolocation: geolocationReducer });

export type RootReducer = ReturnType<typeof rootReducer>;
