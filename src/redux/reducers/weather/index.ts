import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@redux/store";
import { getWeatherForecast } from "@services/weather";
import { getCurrentLocationSuccess } from "@redux/reducers/geolocation";
import { ILatLng } from "@services/geolocation";

export interface IDailyForecast {
	readonly minTemperature: number;
	readonly maxTemperature: number;
	readonly dayOfWeek: number;
}

export interface ICurrentWeather {
	readonly date: number;
	readonly sunrise: number;
	readonly sunset: number;
	readonly temperature: number;
	readonly feelsLike: number;
	readonly pressure: number;
	readonly humidity: number;
	readonly clouds: number;
	readonly uvIndex: number;
	readonly visibility: number;
	readonly windSpeed: number;
	readonly windDeg: number;
	readonly rain?: number;
	readonly snow?: number;
	readonly weather: {
		readonly id: number;
		readonly main: string;
		readonly description: string;
		readonly icon: string;
	};
}
export interface IWeatherState {
	readonly isLoading: boolean;
	readonly errorMessage?: string;
	readonly current: ICurrentWeather | null;
	readonly forecast: IDailyForecast[];
}

const initialState: IWeatherState = {
	current: null,
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
		getForecastSuccess(state, action: PayloadAction<Pick<IWeatherState, "current" | "forecast">>) {
			state.isLoading = false;
			state.errorMessage = "";
			state.current = action.payload.current;
			state.forecast = action.payload.forecast;
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

export const fetchWeatherForecast = (location: string | ILatLng, language?: string): AppThunk<Promise<void>> => async (
	dispatch,
) => {
	dispatch(getForecastStart());

	try {
		const { location: coordinates, current, forecast } = await getWeatherForecast(location, language);

		dispatch(getForecastSuccess({ current, forecast }));
		dispatch(getCurrentLocationSuccess(coordinates));
	} catch (error) {
		dispatch(getForecastError(error.toString()));
	}
};

export default weatherSlice.reducer;
