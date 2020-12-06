import React from "react";
import { render } from "@utils/test-utils";
import { TabControls } from "@components/weather";
import "@testing-library/jest-dom/extend-expect";

describe("Tab controls component", () => {
	describe("Rendering", () => {
		const voidCallback = (): void => undefined;

		it("Should render correctly on large screen", () => {
			const { container } = render(
				<TabControls currentWeatherDisabled={false} largeScreen onTabChange={voidCallback} currentTab={0} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should render correctly on small screens", () => {
			const { container } = render(
				<TabControls currentWeatherDisabled={false} largeScreen={false} onTabChange={voidCallback} currentTab={0} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should render correctly with disabled current weather tab", () => {
			const { container } = render(
				<TabControls currentWeatherDisabled largeScreen onTabChange={voidCallback} currentTab={0} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
