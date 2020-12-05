import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { generateTheme } from "@src/theme";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
};

const theme = generateTheme();

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Story />
		</ThemeProvider>
	),
];
