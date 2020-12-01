import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@redux/store";
import { getWeatherForecast } from "@services/weather";

export interface IDailyForecast {
	readonly minTemperature: number;
	readonly maxTemperature: number;
	readonly dayOfWeek: string;
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

const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {
		getForecastStart(state) {
			state.isLoading = true;
		},
		getForecastSuccess(state, action: PayloadAction<IDailyForecast[]>) {
			state.isLoading = false;
			state.errorMessage = "";
			state.forecast = action.payload;
		},
		getForecastError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.errorMessage = action.payload;
		},
	},
});

export const { getForecastStart, getForecastError, getForecastSuccess } = weatherSlice.actions;

export type WeatherActions =
	| ReturnType<typeof getForecastStart>
	| ReturnType<typeof getForecastError>
	| ReturnType<typeof getForecastSuccess>;

export const fetchWeatherForecast = (city: string): AppThunk<Promise<void>> => async (dispatch) => {
	dispatch(getForecastStart());

	try {
		const forecast = await getWeatherForecast(city);

		dispatch(getForecastSuccess(forecast));
	} catch (error) {
		dispatch(getForecastError(error.toString()));
	}
};

export default weatherSlice.reducer;
