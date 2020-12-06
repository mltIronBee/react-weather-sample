import React from "react";
import { render, screen } from "@utils/test-utils";
import { CurrentWeather, ICurrentWeatherProps } from "@components/weather";
import "@testing-library/jest-dom/extend-expect";

describe("Current weather component", () => {
	const defaultProps: Omit<ICurrentWeatherProps, "rain" | "snow"> = {
		clouds: 45,
		date: "December 6, 2020, 12:53 PM GMT+2",
		feelsLike: -6,
		humidity: 80,
		pressure: 1000,
		sunrise: "06:00",
		sunset: "18:00",
		temperature: 1,
		uvIndex: 0,
		visibility: 10000,
		weatherDescription: "Clear sky",
		weatherIcon: "01d",
		windDeg: 45,
		windSpeed: 5,
	};

	describe("Rendering", () => {
		it("Should render correctly without rain and snow", () => {
			const { container } = render(<CurrentWeather {...defaultProps} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should render correctly with rain", () => {
			const { container } = render(<CurrentWeather {...defaultProps} rain={23} />);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should render correctly with snow", () => {
			const { container } = render(<CurrentWeather {...defaultProps} snow={23} />);

			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("Wind direction", () => {
		const normalizeAngle = (angle: number): number => {
			if (angle < 0) {
				return normalizeAngle(360 + angle);
			} else if (angle > 360) {
				return normalizeAngle(angle - 360);
			}

			return angle;
		};

		it("Should display correct wind direction for different wind degrees", () => {
			// Generates an array with degrees of wind direction in a way, that each direction has 3 values of degrees
			const windDirections = Array.from(new Array(24)).map((_, i) => normalizeAngle(-22.5 + 15 * (i + 1)));
			const northDirections = windDirections.slice(0, 3);
			const northEastDirections = windDirections.slice(3, 6);
			const eastDirections = windDirections.slice(6, 9);
			const southEastDirections = windDirections.slice(9, 12);
			const southDirections = windDirections.slice(12, 15);
			const southWestDirections = windDirections.slice(15, 18);
			const westDirections = windDirections.slice(18, 21);
			const northWestDirections = windDirections.slice(21, 24);

			const { rerender } = render(<CurrentWeather {...defaultProps} />);

			for (const windDeg of northDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^north$/i)).toBeInTheDocument();
			}

			for (const windDeg of northEastDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^north-east$/i)).toBeInTheDocument();
			}

			for (const windDeg of eastDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^east$/i)).toBeInTheDocument();
			}

			for (const windDeg of southEastDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^south-east$/i)).toBeInTheDocument();
			}

			for (const windDeg of southDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^south$/i)).toBeInTheDocument();
			}

			for (const windDeg of southWestDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^south-west$/i)).toBeInTheDocument();
			}

			for (const windDeg of westDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^west$/i)).toBeInTheDocument();
			}

			for (const windDeg of northWestDirections) {
				rerender(<CurrentWeather {...defaultProps} windDeg={windDeg} />);

				expect(screen.getByText(/^north-west$/i)).toBeInTheDocument();
			}
		});
	});
});
