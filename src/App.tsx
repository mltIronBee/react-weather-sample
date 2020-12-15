import React, { useMemo } from "react";
import { HomePage } from "@containers/pages/home";
import { ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import { generateTheme } from "@src/theme";

function App(): JSX.Element {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(() => generateTheme(prefersDarkMode), [prefersDarkMode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<HomePage />
		</ThemeProvider>
	);
}

export default App;
