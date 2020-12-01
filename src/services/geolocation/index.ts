import * as geolocationApi from "@utils/geolocation-api";

export interface ILatLng {
	lat: number;
	lng: number;
}

export interface ICurrentLocation {
	location: string;
	coordinates: ILatLng;
}

export const getCoordinatesByCity = async (city: string): Promise<ILatLng> => {
	const searchResult = await geolocationApi.search(city);

	const coordinates = {
		lat: +searchResult.data[0].lat,
		lng: +searchResult.data[0].lon,
	};

	if (isNaN(coordinates.lat) || isNaN(coordinates.lng)) {
		throw new Error("Failed to retrieve location");
	}

	return coordinates;
};

export const getCurrentLocation = async (): Promise<ICurrentLocation> => {
	const [lat, lng] = await geolocationApi.getCurrentPosition();
	const searchResult = await geolocationApi.reverseSearch(lat, lng);

	return {
		location: searchResult.data.display_name,
		coordinates: { lat, lng },
	};
};
