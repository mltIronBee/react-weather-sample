import { DEFAULT_COORDS } from "@utils/test-utils";
import * as weatherApi from "@utils/weather-api";
import axios from "axios";

jest.mock("axios");

describe("Weather API", () => {
	afterEach(() => {
		(axios as any)._instanceMock.reset();
	});

	it("Should search by city name, if provided city is a string", async () => {
		await weatherApi.getForecast(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);

		const spy = jest.spyOn((axios as any)._instanceMock, "get");

		expect(spy).toBeCalledWith("/onecall", {
			params: {
				lat: DEFAULT_COORDS.lat,
				lon: DEFAULT_COORDS.lng,
				units: "metric",
				exclude: "minutely,hourly,alerts",
				appid: process.env.WEATHER_API_KEY,
			},
		});
	});
});
