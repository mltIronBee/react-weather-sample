import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "@redux/reducers";
import { IWeatherState } from "@src/redux/reducers/weather";

export interface IAppState {
	weather: IWeatherState;
}

export default configureStore<IAppState>({
	reducer: { weather: weatherReducer },
});
