import React from "react";
import { render, screen } from "@utils/test-utils";
import { ForecastGraph } from "@components/weather";
import { IForecastGraphProps } from "@components/weather/forecast-graph";
import "@testing-library/jest-dom/extend-expect";

describe("Forecast graph component", () => {
	const testData: IForecastGraphProps["data"] = [
		{ dayOfWeek: 1, minTemperature: 5, maxTemperature: 13 },
		{ dayOfWeek: 2, minTemperature: 3, maxTemperature: 11 },
		{ dayOfWeek: 3, minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: 4, minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: 5, minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: 6, minTemperature: 2, maxTemperature: 8 },
		{ dayOfWeek: 7, minTemperature: 1, maxTemperature: 8 },
	];

	describe("Rendering", () => {
		it("Should correctly render graph without data", () => {
			const { container } = render(<ForecastGraph data={[]} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render graph with data", () => {
			const { container } = render(<ForecastGraph data={testData} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render graph with error", () => {
			const { container } = render(<ForecastGraph data={[]} hasError />);

			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("Props handling", () => {
		it("Should hide graph and show information message about missing data", async () => {
			render(<ForecastGraph data={[]} />);

			const message = await screen.findByText(/no data/i);

			expect(message).toBeInTheDocument();
		});

		it("Should hide graph and show error message on error", async () => {
			render(<ForecastGraph data={testData} hasError />);

			const message = await screen.findByText(/error/i);

			expect(message).toBeInTheDocument();
		});
	});
});
