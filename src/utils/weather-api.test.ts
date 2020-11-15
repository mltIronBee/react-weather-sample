import * as weatherApi from "@utils/weather-api";
import axios from "axios";

jest.mock("axios");

describe("Weather API", () => {
	afterEach(() => {
		(axios as any)._instanceMock.reset();
	});

	it("Should search by city name, if provided city is a string", async () => {
		const testCity = "city name";

		await weatherApi.getForecast(testCity);

		const spy = jest.spyOn((axios as any)._instanceMock, "get");

		expect(spy).toBeCalledWith("/forecast/daily", {
			params: { q: testCity, cnt: 7, units: "metric", appid: process.env.WEATHER_API_KEY },
		});
	});

	it("Should search by city ID, if provided city is a number", async () => {
		const testCity = 123;

		await weatherApi.getForecast(testCity);

		const spy = jest.spyOn((axios as any)._instanceMock, "get");

		expect(spy).toBeCalledWith("/forecast/daily", {
			params: { id: testCity, cnt: 7, units: "metric", appid: process.env.WEATHER_API_KEY },
		});
	});
});
