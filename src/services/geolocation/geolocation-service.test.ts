import * as geolocationService from "@services/geolocation";
import { DEFAULT_COORDS } from "@utils/test-utils";

jest.mock("@utils/geolocation-api");
const geolocationApi = jest.requireMock("@utils/geolocation-api");

describe("Geolocation Service", () => {
	it("Should get location coordinates by provided city name, and convert them to number", async () => {
		const actualCoordinates = await geolocationService.getCoordinatesByCity("Test");

		expect(actualCoordinates).toHaveProperty("lat");
		expect(actualCoordinates).toHaveProperty("lng");
		expect(actualCoordinates.lat).toStrictEqual(DEFAULT_COORDS.lat);
		expect(actualCoordinates.lng).toStrictEqual(DEFAULT_COORDS.lng);
	});

	it("Should reject coordinates retrieval request, if their conversion to number has failed", async () => {
		jest.spyOn(geolocationApi, "search").mockImplementationOnce(() =>
			Promise.resolve({
				status: 200,
				statusText: "OK",
				config: {},
				headers: {},
				data: [
					{
						lat: "foo",
						lon: "bar",
					},
				],
			}),
		);

		expect.assertions(1);

		try {
			await geolocationService.getCoordinatesByCity("test");
		} catch (error) {
			expect(error.message).toMatch(/failed/i);
		}
	});

	it("Should retrieve users current location in text form, along with coordinates", async () => {
		const actual = await geolocationService.getCurrentLocation();

		expect(actual.location).toEqual("Fake country, Fake State, Fake city");
		expect(actual.coordinates.lat).toEqual(DEFAULT_COORDS.lat);
		expect(actual.coordinates.lng).toEqual(DEFAULT_COORDS.lng);
	});
});
