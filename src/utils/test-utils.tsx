import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import { GenerateId } from "jss";
import { StylesProvider } from "@material-ui/core/styles";
import theme from "@src/theme";

const generateClassName: GenerateId = (rule, sheet) => `${sheet!.options.classNamePrefix}-${rule.key}`;

const AllTheProviders: React.FC = ({ children }) => (
	<StylesProvider generateClassName={generateClassName}>
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	</StylesProvider>
);

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "queries">): RenderResult =>
	render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from "@testing-library/react";

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
