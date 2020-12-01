import * as weatherService from "@services/weather";
import { IDailyForecast } from "@src/redux/reducers/weather";
import * as weatherApi from "@utils/weather-api";
import * as geolocationApi from "@utils/geolocation-api";

jest.mock("@utils/weather-api");
jest.mock("@utils/geolocation-api");

describe("Weather service", () => {
	const generateTestData = (): weatherApi.IGetForecastResponse["daily"] => {
		const data: weatherApi.IGetForecastResponse["daily"] = [];

		for (let i = 0; i < 7; i++) {
			// 09 Nov 2020 is a Monday, this way we generate forecast for each day of week
			const day = i + 9;
			const dayString = day.toString(10).padStart(2, "0");

			/* eslint-disable camelcase */
			data.push({
				clouds: 0,
				wind_deg: 0,
				dew_point: 0,
				uvi: 0,
				visibility: 0,
				dt: Math.floor(new Date(`2020-11-${dayString}T00:00:00Z`).getTime() / 1000),
				// eslint-disable-next-line camelcase
				feels_like: {
					day: 25,
					eve: 10,
					morn: 20,
					night: 0,
				},
				humidity: 0,
				pop: 0,
				pressure: 0,
				wind_speed: 0,
				sunrise: Math.floor(new Date(`2020-11-${dayString}T06:00:00Z`).getTime() / 1000),
				sunset: Math.floor(new Date(`2020-11-${dayString}T18:00:00Z`).getTime() / 1000),
				temp: {
					day: 25,
					eve: 10,
					max: 25 + i,
					min: 0 + i,
					morn: 20,
					night: 0,
				},
				weather: [
					{
						description: "sunny clear sky",
						icon: "icon",
						id: 0,
						main: "",
					},
				],
			});
			/* eslint-enable camelcase */
		}

		return data;
	};
	const testResponse = generateTestData();

	beforeAll(() => {
		(weatherApi as any)._setMockData(testResponse);
	});

	afterAll(() => {
		(geolocationApi as any)._resetHistory();
		(weatherApi as any)._clearMockData();
	});

	it("Should correctly map API response", async () => {
		const expected: IDailyForecast[] = [
			{ dayOfWeek: "Monday", minTemperature: 0, maxTemperature: 25 },
			{ dayOfWeek: "Tuesday", minTemperature: 1, maxTemperature: 26 },
			{ dayOfWeek: "Wednesday", minTemperature: 2, maxTemperature: 27 },
			{ dayOfWeek: "Thursday", minTemperature: 3, maxTemperature: 28 },
			{ dayOfWeek: "Friday", minTemperature: 4, maxTemperature: 29 },
			{ dayOfWeek: "Saturday", minTemperature: 5, maxTemperature: 30 },
			{ dayOfWeek: "Sunday", minTemperature: 6, maxTemperature: 31 },
		];

		const actual = await weatherService.getWeatherForecast("Odesa");

		expect(actual).toEqual(expected);
	});
});
