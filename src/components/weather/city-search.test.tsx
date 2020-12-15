import React from "react";
import { render, screen } from "@utils/test-utils";
import { CitySearch } from "@components/weather";
import "@testing-library/jest-dom/extend-expect";

describe("City search input", () => {
	const voidCallback = (): void => undefined;

	describe("Rendering", () => {
		it("Should render correctly", () => {
			const testCity = "Odesa";
			const { container, getByDisplayValue } = render(
				<CitySearch
					geolocationAvailable
					searching={false}
					value={testCity}
					onGetLocation={voidCallback}
					onChange={voidCallback}
					onSearch={voidCallback}
				/>,
			);

			expect(getByDisplayValue(testCity)).toBeInTheDocument();
			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render input during loading", () => {
			const { container } = render(
				<CitySearch
					geolocationAvailable
					onGetLocation={voidCallback}
					searching
					value=""
					onChange={voidCallback}
					onSearch={voidCallback}
				/>,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render error message and outline on error", () => {
			const testCity = "Lorem Ipsum";
			const testMessage = "Invalid city name";
			const { container, getByText, getByDisplayValue } = render(
				<CitySearch
					geolocationAvailable
					searching={false}
					errorMessage={testMessage}
					value={testCity}
					onGetLocation={voidCallback}
					onChange={voidCallback}
					onSearch={voidCallback}
				/>,
			);

			expect(getByDisplayValue(testCity)).toBeInTheDocument();
			expect(getByText(testMessage)).toBeInTheDocument();
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("Input controls managing", () => {
		it("Should disable search button, if user hasn't entered any text", async () => {
			render(
				<CitySearch
					value=""
					searching={false}
					geolocationAvailable
					onChange={voidCallback}
					onSearch={voidCallback}
					onGetLocation={voidCallback}
				/>,
			);

			const searchButton = screen.getByLabelText(/^search$/i);

			expect(searchButton).toBeDisabled();
		});

		it("Should enable search button, when user enters text", () => {
			render(
				<CitySearch
					value="test"
					searching={false}
					geolocationAvailable
					onChange={voidCallback}
					onSearch={voidCallback}
					onGetLocation={voidCallback}
				/>,
			);

			const searchButton = screen.getByLabelText(/^search$/i);

			expect(searchButton).not.toBeDisabled();
		});

		it("Should disable geolocation button, if geolocation is not available", () => {
			render(
				<CitySearch
					value=""
					searching={false}
					geolocationAvailable={false}
					onChange={voidCallback}
					onSearch={voidCallback}
					onGetLocation={voidCallback}
				/>,
			);

			const geolocationButton = screen.getByLabelText(/^geolocation is not available$/i);

			expect(geolocationButton).toBeDisabled();
		});

		it("Should not disable geolocation button, if geolocation is available", () => {
			render(
				<CitySearch
					geolocationAvailable
					value=""
					searching={false}
					onChange={voidCallback}
					onSearch={voidCallback}
					onGetLocation={voidCallback}
				/>,
			);

			const geolocationButton = screen.getByLabelText(/^use current location$/i);

			expect(geolocationButton).not.toBeDisabled();
		});
	});
});
