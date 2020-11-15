import * as weatherService from "@services/weather";
import { IDailyForecast } from "@src/redux/reducers/weather";
import * as weatherApi from "@utils/weather-api";

jest.mock("@utils/weather-api");

describe("Weather service", () => {
	const generateTestData = (): weatherApi.IGetForecastResponse["list"] => {
		const data: weatherApi.IGetForecastResponse["list"] = [];

		for (let i = 0; i < 7; i++) {
			// 09 Nov 2020 is a Monday, this way we generate forecast for each day of week
			const day = i + 9;
			const dayString = day.toString(10).padStart(2, "0");

			data.push({
				clouds: 0,
				deg: 0,
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
				speed: 0,
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
		}

		return data;
	};
	const testResponse = generateTestData();

	beforeAll(() => {
		(weatherApi as any)._setMockData(testResponse);
	});

	it("Should correctly map API response", async () => {
		const expected: IDailyForecast[] = [
			{ dayOfWeek: 1, minTemperature: 0, maxTemperature: 25 },
			{ dayOfWeek: 2, minTemperature: 1, maxTemperature: 26 },
			{ dayOfWeek: 3, minTemperature: 2, maxTemperature: 27 },
			{ dayOfWeek: 4, minTemperature: 3, maxTemperature: 28 },
			{ dayOfWeek: 5, minTemperature: 4, maxTemperature: 29 },
			{ dayOfWeek: 6, minTemperature: 5, maxTemperature: 30 },
			{ dayOfWeek: 7, minTemperature: 6, maxTemperature: 31 },
		];

		const actual = await weatherService.getWeatherForecast(0);

		expect(actual).toEqual(expected);
	});
});
