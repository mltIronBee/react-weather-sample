import React from "react";
import { render, screen } from "@utils/test-utils";
import { ForecastGraph } from "@components/weather";
import { IForecastGraphProps } from "@src/components/weather/forecast-graph";
import "@testing-library/jest-dom/extend-expect";

describe("Forecast graph component", () => {
	const testData: IForecastGraphProps["data"] = [
		{ dayOfWeek: "Monday", minTemperature: 5, maxTemperature: 13 },
		{ dayOfWeek: "Tuesday", minTemperature: 3, maxTemperature: 11 },
		{ dayOfWeek: "Wednesday", minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: "Thursday", minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: "Friday", minTemperature: 4, maxTemperature: 9 },
		{ dayOfWeek: "Saturday", minTemperature: 2, maxTemperature: 8 },
		{ dayOfWeek: "Sunday", minTemperature: 1, maxTemperature: 8 },
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

		it("Should correctly render graph without data while loading", () => {
			const { container } = render(<ForecastGraph data={[]} loading />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render graph with error while loading", () => {
			const { container } = render(<ForecastGraph data={[]} loading hasError />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render graph with data while loading", () => {
			const { container } = render(<ForecastGraph data={testData} loading />);

			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("Props handling", () => {
		it("Should hide graph and show information message about missing data", async () => {
			render(<ForecastGraph data={[]} />);

			const message = await screen.findByText(/no data/i);

			expect(message).toBeInTheDocument();
		});

		it("Should draw loading indicator on top of the information message, while graph is loading", async () => {
			render(<ForecastGraph data={[]} loading />);

			const info = await screen.findByText(/no data/i);
			const indicator = await screen.findByText(/loading\.\.\./i);

			expect(indicator).toBeInTheDocument();
			expect(info).toBeInTheDocument();
		});

		it("Should draw loading indicator on top of the error message, while graph is loading", async () => {
			render(<ForecastGraph data={testData} loading hasError />);

			const message = await screen.findByText(/error/i);
			const indicator = await screen.findByText(/loading\.\.\./i);

			expect(indicator).toBeInTheDocument();
			expect(message).toBeInTheDocument();
		});

		it("Should draw loading indicator on top of the graph, while loading", async () => {
			render(<ForecastGraph data={testData} loading />);

			const indicator = await screen.findByText(/loading\.\.\./i);
			const barChart = await screen.findByText(/^mon$/i);

			expect(indicator).toBeInTheDocument();
			expect(barChart).toBeInTheDocument();
		});

		it("Should hide graph and show error message on error", async () => {
			render(<ForecastGraph data={testData} hasError />);

			const message = await screen.findByText(/error/i);

			expect(message).toBeInTheDocument();
		});
	});
});
