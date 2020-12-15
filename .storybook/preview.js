import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { generateTheme } from "@src/theme";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import commonTranslations from "../public/locales/en/common.json";
import currentWeatherTranslations from "../public/locales/en/current-weather.json";
import forecastTranslations from "../public/locales/en/forecast.json";
import homeTranslations from "../public/locales/en/home.json";
import searchInputTranslations from "../public/locales/en/search-input.json";
import tabControlsTranslations from "../public/locales/en/tab-controls.json";
import unitsTranslations from "../public/locales/en/units.json";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
};

i18next.use(initReactI18next).init({
	react: {
		useSuspense: false,
	},
	debug: true,
	supportedLngs: ["en"],
	fallbackLng: "en",
	resources: {
		en: {
			common: commonTranslations,
			"current-weather": currentWeatherTranslations,
			forecast: forecastTranslations,
			home: homeTranslations,
			"search-input": searchInputTranslations,
			"tab-controls": tabControlsTranslations,
			units: unitsTranslations,
		},
	},
});

const theme = generateTheme();

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Story />
		</ThemeProvider>
	),
];
