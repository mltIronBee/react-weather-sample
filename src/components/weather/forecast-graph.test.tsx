import React from "react";
import { render, screen } from "@utils/test-utils";
import { ForecastGraph } from "@components/weather";
import "@testing-library/jest-dom/extend-expect";
import { IForecastGraphProps } from "@src/components/weather/forecast-graph";

describe("Forecast graph component", () => {
	const testData: IForecastGraphProps["data"] = [
		{ dayOfWeek: "Monday", min: 5, max: 13 },
		{ dayOfWeek: "Tuesday", min: 3, max: 11 },
		{ dayOfWeek: "Wednesday", min: 4, max: 9 },
		{ dayOfWeek: "Thursday", min: 4, max: 9 },
		{ dayOfWeek: "Friday", min: 4, max: 9 },
		{ dayOfWeek: "Saturday", min: 2, max: 8 },
		{ dayOfWeek: "Sunday", min: 1, max: 8 },
	];

	describe("Props handling", () => {
		it("Should draw loading indicator, while graph is loading", async () => {
			render(<ForecastGraph data={testData} loading />);

			const indicator = await screen.findByText(/loading/i);

			expect(indicator).toBeInTheDocument();
		});

		it("Should hide graph and show error message on error", async () => {
			render(<ForecastGraph data={testData} hasError />);

			const message = await screen.findByText(/error/i);

			expect(message).toBeInTheDocument();
		});
	});
});
