import { DateTime } from "luxon";
import { createSelector } from "@reduxjs/toolkit";
import { IAppState } from "@redux/reducers";
import { IWeatherState } from "@redux/reducers/weather";
import { getWeatherIcon } from "@utils/weather-api";

const currentSelector = (state: IAppState): IWeatherState["current"] => state.weather.current;

export const currentWeatherSelector = createSelector(currentSelector, (currentWeather) => {
	if (currentWeather === null) {
		return currentWeather;
	}

	const {
		weather: { icon, description },
		...weather
	} = currentWeather;

	return {
		...weather,
		date: DateTime.fromMillis(weather.date).toLocaleString(DateTime.DATETIME_FULL),
		sunrise: DateTime.fromMillis(weather.sunrise).toLocaleString(DateTime.TIME_24_SIMPLE),
		sunset: DateTime.fromMillis(weather.sunset).toLocaleString(DateTime.TIME_24_SIMPLE),
		weatherDescription: description,
		weatherIcon: getWeatherIcon(icon),
	};
});
