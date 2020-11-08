import React from "react";
import { render } from "@testing-library/react";
import { ForecastGraph } from "@components/weather";
import "@testing-library/jest-dom/extend-expect";

describe("Forecast graph component", () => {
	describe("Rendering", () => {
		it("Should render correctly", () => {
			const { container } = render(<ForecastGraph />);

			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
