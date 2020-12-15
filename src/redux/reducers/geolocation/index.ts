import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGeolcationState {
	lat: number | null;
	lng: number | null;
}

const initialState: IGeolcationState = {
	lat: null,
	lng: null,
};

const geolocationSlice = createSlice({
	name: "geolocation",
	initialState,
	reducers: {
		getCurrentLocationSuccess(state, action: PayloadAction<IGeolcationState>) {
			state.lat = action.payload.lat;
			state.lng = action.payload.lng;
		},
	},
});

export const { getCurrentLocationSuccess } = geolocationSlice.actions;

export type GeolocationActions = ReturnType<typeof getCurrentLocationSuccess>;

export default geolocationSlice.reducer;
