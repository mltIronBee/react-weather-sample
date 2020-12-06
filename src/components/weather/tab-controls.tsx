import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export interface ITabControlsProps {
	currentTab: number;
	onTabChange: (event: React.ChangeEvent<unknown>, value: number) => void;
	largeScreen: boolean;
	currentWeatherDisabled: boolean;
}

export const TabControls: React.FC<ITabControlsProps> = (props) => (
	<Tabs
		value={props.currentTab}
		onChange={props.onTabChange}
		indicatorColor="primary"
		textColor="primary"
		variant={props.largeScreen ? "standard" : "fullWidth"}
		centered={props.largeScreen}
		aria-label="tabs control to pick between week forecast and current weather"
	>
		<Tab label="Forecast" id="forecast-tab" aria-controls="forecast-panel" aria-label="forecast tab" />
		<Tab
			disabled={props.currentWeatherDisabled}
			label="Current weather"
			id="current-weather-tab"
			aria-controls="current-weather-panel"
			aria-label="current weather tab"
		/>
	</Tabs>
);
