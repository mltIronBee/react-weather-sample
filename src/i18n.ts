import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
	.use(LanguageDetector)
	.use(Backend)
	.use(initReactI18next)
	.init({
		react: {
			useSuspense: false,
		},
		debug: process.env.NODE_ENV === "development",
		ns: ["common", "current-weather", "forecast", "home", "search-input", "tab-controls", "units"],
		supportedLngs: ["en", "ru", "uk"],
		fallbackLng: "en",
		backend: {
			loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
		},
	});
