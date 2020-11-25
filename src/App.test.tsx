import React from "react";
import { Provider } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import { render, screen, waitFor } from "@utils/test-utils";
import App from "@src/App";
import { IAppState } from "@redux/reducers";
import "@testing-library/jest-dom/extend-expect";

describe("App container", () => {
	const store = configureStore<IAppState>(getDefaultMiddleware())({
		weather: {
			isLoading: false,
			forecast: [],
			errorMessage: "",
		},
	});

	it("Should render correctly", () => {
		const { container } = render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});
	it("Should render title", async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);
		const titleElement = await waitFor(() => screen.findByText(/React weather forecast/i));

		expect(titleElement).toBeInTheDocument();
	});
});
