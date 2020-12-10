/* istanbul ignore file */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import createStore from "@redux/store";
import { SnackbarProvider } from "@containers/snackbar";
import App from "@src/App";
import reportWebVitals from "@src/reportWebVitals";
import "@src/i18n";

const store = createStore();

render(
	<React.StrictMode>
		<Provider store={store}>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
