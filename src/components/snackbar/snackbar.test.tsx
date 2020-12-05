import React from "react";
import { render } from "@utils/test-utils";
import { Snackbar } from "@components/snackbar";
import "@testing-library/jest-dom/extend-expect";

describe("Snackbar component", () => {
	describe("Rendering", () => {
		const voidCallback = (): void => undefined;

		it("Should correctly render default snackbar", () => {
			const { container } = render(
				<Snackbar open message="Default snackbar" onClose={voidCallback} onExited={voidCallback} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render success snackbar", () => {
			const { container } = render(
				<Snackbar open type="success" message="Success snackbar" onClose={voidCallback} onExited={voidCallback} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render info snackbar", () => {
			const { container } = render(
				<Snackbar open type="info" message="Info snackbar" onClose={voidCallback} onExited={voidCallback} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render warning snackbar", () => {
			const { container } = render(
				<Snackbar open type="warning" message="Warning snackbar" onClose={voidCallback} onExited={voidCallback} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});

		it("Should correctly render error snackbar", () => {
			const { container } = render(
				<Snackbar open type="error" message="Error snackbar" onClose={voidCallback} onExited={voidCallback} />,
			);

			expect(container.firstChild).toMatchSnapshot();
		});
	});
});
