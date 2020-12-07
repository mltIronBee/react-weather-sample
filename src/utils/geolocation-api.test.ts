import * as geolocationApi from "@utils/geolocation-api";
import axios from "axios";

jest.mock("axios");

describe("Geolocation API", () => {
	const instance = (axios as any)._instanceMock;
	const getCurrentPositionMock = jest.fn<
		void,
		[successCallback: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions]
	>();
	let oldGeolocation: Geolocation;

	beforeAll(() => {
		oldGeolocation = global.navigator.geolocation;
		(global.navigator as any).geolocation = {
			getCurrentPosition: getCurrentPositionMock,
		};
	});

	beforeEach(() => {
		instance.reset();
		getCurrentPositionMock.mockReset();
	});

	afterAll(() => {
		instance.restore();
		(global.navigator as any).geolocation = oldGeolocation;
	});

	it("Should call search request with correct parameters", async () => {
		const testCity = "Test";

		await geolocationApi.search(testCity);

		expect(instance.get).toBeCalledWith("/search", { params: { q: testCity, format: "json", limit: 1 } });
	});

	it("Should call reverse search request with correct parameters", async () => {
		const testLocation: [lat: number, lon: number] = [40, 30];

		await geolocationApi.reverseSearch(...testLocation);

		expect(instance.get).toBeCalledWith("/reverse", {
			params: { lat: testLocation[0], lon: testLocation[1], zoom: 10, format: "json" },
		});
	});

	it("Should successfully resolve tuple with user location on successful geolocation", async () => {
		const testCoords = [40, 30];

		getCurrentPositionMock.mockImplementation((success) => {
			success({
				coords: {
					latitude: testCoords[0],
					longitude: testCoords[1],
					altitude: 0,
					heading: 0,
					accuracy: 0,
					speed: 0,
					altitudeAccuracy: 0,
				},
				timestamp: Date.now(),
			});
		});

		const actual = await geolocationApi.getCurrentPosition();

		expect(actual).toEqual(testCoords);
	});

	it("Should reject current position request on geolocation error", async () => {
		getCurrentPositionMock.mockImplementation((_, error) => {
			if (error) {
				error({
					PERMISSION_DENIED: 1,
					POSITION_UNAVAILABLE: 2,
					TIMEOUT: 3,
					code: 1,
					message: "Geoposition permission denied",
				});
			}
		});

		expect.assertions(1);

		try {
			await geolocationApi.getCurrentPosition();
		} catch (e) {
			expect(e.message).toMatch(/permission/i);
		}
	});
});
