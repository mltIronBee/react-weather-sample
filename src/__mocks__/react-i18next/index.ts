import { useState } from "react";
import commonTranslations from "../../../public/locales/en/common.json";
import currentWeatherTranslations from "../../../public/locales/en/current-weather.json";
import forecastTranslations from "../../../public/locales/en/forecast.json";
import homeTranslations from "../../../public/locales/en/home.json";
import searchInputTranslations from "../../../public/locales/en/search-input.json";
import tabControlsTranslations from "../../../public/locales/en/tab-controls.json";
import unitsTranslations from "../../../public/locales/en/units.json";

const reactI18nextMock = jest.genMockFromModule<any>("react-i18next");

const translate = (key: string): string => {
	const [namespace, item] = key.split(":");

	switch (namespace) {
		case "common":
			return (commonTranslations as any)[item];
		case "current-weather":
			return (currentWeatherTranslations as any)[item];
		case "forecast":
			return (forecastTranslations as any)[item];
		case "home":
			return (homeTranslations as any)[item];
		case "search-input":
			return (searchInputTranslations as any)[item];
		case "tab-controls":
			return (tabControlsTranslations as any)[item];
		case "units":
			return (unitsTranslations as any)[item];
		default:
			return "";
	}
};

interface IUseTranslation {
	t: (key: string) => string;
	i18n: {
		language: string;
		changeLanguage: (language: string) => void;
	};
}

const useTranslation = (): IUseTranslation => {
	const [language, changeLanguage] = useState("en");

	return { t: translate, i18n: { language, changeLanguage } };
};

module.exports = {
	...reactI18nextMock,
	useTranslation,
};
