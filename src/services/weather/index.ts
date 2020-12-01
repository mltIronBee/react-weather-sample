import { DateTime } from "luxon";
import { IDailyForecast } from "@redux/reducers/weather";
import * as geolocationApi from "@utils/geolocation-api";
import * as weatherApi from "@utils/weather-api";

export const getWeatherForecast = async (city: string): Promise<IDailyForecast[]> => {
	const geolocationResponse = await geolocationApi.search(city);

	const coordinates = { lat: geolocationResponse.data[0].lat, lng: geolocationResponse.data[0].lon };

	const response = await weatherApi.getForecast(+coordinates.lat, +coordinates.lng);

	return response.data.daily.map((item) => ({
		dayOfWeek: DateTime.fromMillis(item.dt * 1000).weekdayLong,
		minTemperature: item.temp.min,
		maxTemperature: item.temp.max,
	}));
};
