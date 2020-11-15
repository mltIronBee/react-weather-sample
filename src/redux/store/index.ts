import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer, IAppState, AppActions } from "@redux/reducers";

export type AppThunk<T = any> = ThunkAction<T, IAppState, unknown, AppActions>;

export default configureStore<IAppState>({
	reducer: rootReducer,
});
