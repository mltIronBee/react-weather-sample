import { DateTime } from "luxon";
import { IDailyForecast } from "@redux/reducers/weather";
import * as weatherApi from "@utils/weather-api";

export const getWeatherForecast = async (city: string | number): Promise<IDailyForecast[]> => {
	const response = await weatherApi.getForecast(city);

	return response.data.list.map((item) => ({
		dayOfWeek: DateTime.fromMillis(item.dt * 1000).weekdayLong,
		minTemperature: item.temp.min,
		maxTemperature: item.temp.max,
	}));
};
