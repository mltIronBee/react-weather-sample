import React from "react";
import { render } from "@utils/test-utils";
import { GraphTooltip } from "@components/weather/graph-tooltip";
import "@testing-library/jest-dom/extend-expect";

describe("Graph tooltip", () => {
	describe("Rendering", () => {
		it("Should render correctly", () => {
			const { container } = render(
				<GraphTooltip
					active
					label="Test label"
					payload={[
						{ name: "Test name 1", value: 10 },
						{ name: "Test name 2", value: -10 },
					]}
				/>,
			);

			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
