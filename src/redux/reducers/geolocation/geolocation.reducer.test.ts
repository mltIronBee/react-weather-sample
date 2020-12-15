import geolocationReducer, { IGeolcationState } from "@redux/reducers/geolocation";
import { DEFAULT_COORDS } from "@utils/test-utils";

describe("Geolocation", () => {
	it("Should correctly return new state, when coordinates successfully received", () => {
		const initialState: IGeolcationState = {
			lat: null,
			lng: null,
		};
		const testAction = {
			type: "geolocation/getCurrentLocationSuccess",
			payload: { lat: DEFAULT_COORDS.lat, lng: DEFAULT_COORDS.lng },
		};

		const actual = geolocationReducer(initialState, testAction);

		expect(actual).toEqual({ lat: DEFAULT_COORDS.lat, lng: DEFAULT_COORDS.lng });
	});
});
