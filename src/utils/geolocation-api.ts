import axios, { AxiosPromise } from "axios";

const instance = axios.create({
	baseURL: "https://nominatim.openstreetmap.org",
});

const ZOOM_LEVEL_CITY = 10;

export type BoundingBox = [minLat: string, maxLat: string, minLon: string, maxLon: string];

/* eslint-disable camelcase */
export interface ISearchResponse {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: string;
	boundingbox: BoundingBox;
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
}

export interface IReverseSearchResponse {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: string;
	lat: string;
	lon: string;
	display_name: string;
	address: {
		city: string;
		county: string;
		state: string;
		country: string;
		country_code: string;
	};
	boundingbox: BoundingBox;
}
/* eslint-enable camelcase */

export const search = (city: string): AxiosPromise<ISearchResponse[]> =>
	instance.get("/search", { params: { q: city, format: "json", limit: 1 } });

export const reverseSearch = (lat: number, lon: number): AxiosPromise<IReverseSearchResponse> =>
	instance.get("/reverse", { params: { lat, lon, zoom: ZOOM_LEVEL_CITY, format: "json" } });

export const getCurrentPosition = (): Promise<[lat: number, lng: number]> =>
	new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve([position.coords.latitude, position.coords.longitude]);
			},
			(error) => {
				let message: string;

				switch (error.code) {
					case error.PERMISSION_DENIED:
						message = "Cannot retrieve current location because permission was not granted";
						break;
					case error.POSITION_UNAVAILABLE:
						message = "Current position is not available";
						break;
					case error.TIMEOUT:
						message = "Geolocation request timed out";
						break;
					default:
						message = "Unexpected error has occurred while trying to determine current position";
				}

				reject(new Error(message));
			},
		);
	});
