import { DEFAULT_COORDS } from "@utils/test-utils";
import { IReverseSearchResponse, ISearchResponse } from "@utils/geolocation-api";
import { AxiosError, AxiosPromise } from "axios";

export const searchSpy = jest.fn();
export const reverseSearchSpy = jest.fn();
export const getCurrentPositionSpy = jest.fn();

export const _resetHistory = (): void => {
	searchSpy.mockClear();
	reverseSearchSpy.mockClear();
	getCurrentPositionSpy.mockClear();
};

export const search = (city: string): AxiosPromise<ISearchResponse[]> =>
	new Promise((resolve, reject) => {
		searchSpy();
		if (city === "invalid") {
			return reject(<AxiosError>{
				code: "400",
				config: {},
				isAxiosError: true,
				message: "Mocked search error",
				name: "Axios Search Error",
			});
		}

		/* eslint-disable camelcase */
		return resolve({
			status: 200,
			statusText: "OK",
			config: {},
			headers: {},
			data: [
				{
					boundingbox: ["-90", "90", "-180", "180"],
					class: "fake",
					display_name: "Fake Country, Fake State, Fake city",
					importance: 1,
					lat: DEFAULT_COORDS.lat.toString(10),
					lon: DEFAULT_COORDS.lng.toString(10),
					licence: "",
					osm_id: "0",
					osm_type: "",
					place_id: 0,
					type: "fake",
				},
			],
		});
	});

export const reverseSearch = (lat: number, lon: number): AxiosPromise<IReverseSearchResponse> =>
	new Promise((resolve, reject) => {
		reverseSearchSpy();
		if (lat !== DEFAULT_COORDS.lat && lon !== DEFAULT_COORDS.lng) {
			return reject(<AxiosError>{
				code: "400",
				config: {},
				isAxiosError: true,
				message: "Mocked reverse search error",
				name: "Axios Reverse Search Error",
			});
		}

		/* eslint-disable camelcase */
		return resolve({
			status: 200,
			statusText: "OK",
			config: {},
			headers: {},
			data: {
				address: {
					city: "Fake city",
					country: "Fake country",
					country_code: "fc",
					county: "Fake county",
					state: "Fake state",
				},
				boundingbox: ["-90", "90", "-180", "180"],
				display_name: "Fake country, Fake State, Fake city",
				lat: DEFAULT_COORDS.lat.toString(10),
				lon: DEFAULT_COORDS.lng.toString(10),
				licence: "",
				osm_id: "0",
				osm_type: "",
				place_id: 0,
			},
		});
	});

export const getCurrentPosition = (): Promise<[lat: number, lng: number]> => {
	getCurrentPositionSpy();

	return Promise.resolve([DEFAULT_COORDS.lat, DEFAULT_COORDS.lng]);
};
