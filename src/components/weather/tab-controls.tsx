import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTranslation } from "react-i18next";

export interface ITabControlsProps {
	currentTab: number;
	onTabChange: (event: React.ChangeEvent<unknown>, value: number) => void;
	largeScreen: boolean;
	currentWeatherDisabled: boolean;
}

export const TabControls: React.FC<ITabControlsProps> = (props) => {
	const { t } = useTranslation(["tab-controls"]);

	return (
		<Tabs
			value={props.currentTab}
			onChange={props.onTabChange}
			indicatorColor="primary"
			textColor="primary"
			variant={props.largeScreen ? "standard" : "fullWidth"}
			centered={props.largeScreen}
			aria-label={t("tab-controls:tabs-aria-label")}
			// aria-label="tabs control to pick between week forecast and current weather"
		>
			<Tab
				label={t("tab-controls:forecast-tab-label")}
				id="forecast-tab"
				aria-controls="forecast-panel"
				aria-label={t("tab-controls:forecast-tab-aria-label")}
			/>
			<Tab
				disabled={props.currentWeatherDisabled}
				label={t("tab-controls:current-weather-tab-label")}
				id="current-weather-tab"
				aria-controls="current-weather-panel"
				aria-label={t("tab-controls:current-weather-tab-aria-label")}
			/>
		</Tabs>
	);
};
