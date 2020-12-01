import { createMuiTheme, Theme } from "@material-ui/core/styles";

export const generateTheme = (prefersDarkMode = false): Theme =>
	createMuiTheme({
		palette: {
			type: prefersDarkMode ? "dark" : "light",
		},
	});
