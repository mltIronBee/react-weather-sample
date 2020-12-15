import { createMuiTheme, Theme } from "@material-ui/core/styles";

/* istanbul ignore next: it's a simple theme generation function, and don't require that much test coverage */
export const generateTheme = (prefersDarkMode = false): Theme =>
	createMuiTheme({
		palette: {
			type: prefersDarkMode ? "dark" : "light",
		},
	});
