import React from "react";
import { render, screen, fireEvent, waitFor } from "@utils/test-utils";
import { LanguageSelector } from "@components/language-selector";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-i18next");

describe("Language Selector component", () => {
	describe("Language selection", () => {
		it("Should open menu with available languages when clicked", () => {
			render(<LanguageSelector />);

			expect(screen.queryAllByAltText(/(english|українська|русский)/i)).toHaveLength(0);

			fireEvent.click(screen.getByText(/en$/i));

			expect(screen.getAllByText(/(english|українська|русский)/i)).toHaveLength(3);
		});

		it("Should change language", () => {
			render(<LanguageSelector />);

			fireEvent.click(screen.getByText(/en$/i));
			fireEvent.click(screen.getByText(/українська/i));

			expect(screen.getByText(/ua$/i)).toBeInTheDocument();
			expect(screen.queryByText(/en$/i)).not.toBeInTheDocument();
		});

		it("Should close language selector menu, when language is selected", async () => {
			render(<LanguageSelector />);

			fireEvent.click(screen.getByText(/en$/i));
			fireEvent.click(screen.getByText(/українська/i));

			await waitFor(() => expect(screen.queryAllByText(/(english|українська|русский)/i)).toHaveLength(0));
		});
	});
});
