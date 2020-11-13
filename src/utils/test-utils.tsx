import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import StylesProvider from "@material-ui/styles/StylesProvider";
import { StylesOptions } from "@material-ui/styles";
import theme from "@src/theme";
import store from "@redux/store";

const generateClassName: StylesOptions["generateClassName"] = (rule, sheet) =>
	`${sheet!.options.classNamePrefix}-${rule.key}`;

const AllTheProviders: React.FC = ({ children }) => (
	<Provider store={store}>
		<StylesProvider generateClassName={generateClassName}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</StylesProvider>
	</Provider>
);

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "queries">): RenderResult =>
	render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line import/export
export * from "@testing-library/react";

// override render method
// eslint-disable-next-line import/export
export { customRender as render };
