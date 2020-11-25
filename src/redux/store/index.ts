import { configureStore, EnhancedStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer, IAppState, AppActions } from "@redux/reducers";

export type AppThunk<T = any> = ThunkAction<T, IAppState, unknown, AppActions>;

export default (initialState?: IAppState): EnhancedStore<IAppState, AppActions> => {
	const store = configureStore<IAppState, AppActions>({
		reducer: rootReducer,
		preloadedState: initialState,
	});

	if (process.env.NODE_ENV === "development" && module.hot) {
		module.hot.accept("@redux/reducers", () => {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const newRootReducer = require("@redux/reducers").default;

			store.replaceReducer(newRootReducer);
		});
	}

	return store;
};
