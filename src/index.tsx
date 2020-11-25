import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import createStore from "@redux/store";
import App from "@src/App";
import theme from "@src/theme";
import reportWebVitals from "@src/reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

const store = createStore();

render(
	<React.StrictMode>
		<CssBaseline />
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
				<ToastContainer />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
