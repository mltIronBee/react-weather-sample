import React from "react";
import { render } from "@testing-library/react";
import { CitySearch } from "@components/weather";
import "@testing-library/jest-dom/extend-expect";

describe("City search input", () => {
	describe("Rendering", () => {
		it("Should render correctly", () => {
			const testCity = "Odesa";
			const { container, getByDisplayValue } = render(
				<CitySearch searching={false} value={testCity} onChange={() => null} onSearch={() => undefined} />,
			);

			expect(getByDisplayValue(testCity)).toBeInTheDocument();
			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render input during loading", () => {
			const { container } = render(<CitySearch searching value="" onChange={() => null} onSearch={() => undefined} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render error message and outline on error", () => {
			const testCity = "Lorem Ipsum";
			const testMessage = "Invalid city name";
			const { container, getByText, getByDisplayValue } = render(
				<CitySearch
					searching={false}
					errorMessage={testMessage}
					value={testCity}
					onChange={() => null}
					onSearch={() => undefined}
				/>,
			);

			expect(getByDisplayValue(testCity)).toBeInTheDocument();
			expect(getByText(testMessage)).toBeInTheDocument();
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
