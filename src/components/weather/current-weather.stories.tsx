import React, { ComponentProps, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { DateTime } from "luxon";
import { Story } from "@storybook/react/types-6-0";
import { CurrentWeather, ICurrentWeatherProps } from "@components/weather";
import { getWeatherIcon } from "@utils/weather-api";

const WindDirectionWrapper: React.FC<Omit<ICurrentWeatherProps, "windDeg">> = (props) => {
	const [windDeg, setWindDeg] = useState(0);

	const handleWindDirectionChange = (event: React.ChangeEvent<unknown>, value: number | number[]): void => {
		setWindDeg(value as number);
	};

	return (
		<Grid container>
			<Typography gutterBottom>Wind direction</Typography>
			<Grid spacing={3} container>
				<Grid item>
					<Typography>0</Typography>
				</Grid>
				<Grid item xs>
					<Slider min={0} max={360} value={windDeg} onChange={handleWindDirectionChange} />
				</Grid>
				<Grid item>
					<Typography>360</Typography>
				</Grid>
			</Grid>
			<Grid container>
				<CurrentWeather windDeg={windDeg} {...props} />
			</Grid>
		</Grid>
	);
};

const Template: Story<ComponentProps<typeof WindDirectionWrapper>> = (args) => <WindDirectionWrapper {...args} />;

export const Default = Template.bind({});

Default.args = {
	date: DateTime.local().toLocaleString(DateTime.DATETIME_FULL),
	sunrise: "06:00",
	sunset: "18:00",
	temperature: 24,
	feelsLike: 20,
	pressure: 1000,
	humidity: 80,
	clouds: 0,
	uvIndex: 0,
	visibility: 10000,
	windSpeed: 5,
	weatherIcon: getWeatherIcon("01d"),
	weatherDescription: "Clear sky",
};

export const WithRain = Template.bind({});

WithRain.args = {
	date: DateTime.local().toLocaleString(DateTime.DATETIME_FULL),
	sunrise: "06:00",
	sunset: "18:00",
	temperature: 5,
	feelsLike: -3,
	pressure: 1000,
	humidity: 80,
	clouds: 0,
	uvIndex: 0,
	visibility: 10000,
	windSpeed: 5,
	weatherIcon: getWeatherIcon("09d"),
	weatherDescription: "shower rain",
	rain: 30,
};

export const WithSnow = Template.bind({});

WithSnow.args = {
	date: DateTime.local().toLocaleString(DateTime.DATETIME_FULL),
	sunrise: "06:00",
	sunset: "18:00",
	temperature: -14,
	feelsLike: -20,
	pressure: 1000,
	humidity: 80,
	clouds: 0,
	uvIndex: 0,
	visibility: 10000,
	windSpeed: 5,
	weatherIcon: getWeatherIcon("13d"),
	weatherDescription: "Snow",
	snow: 30,
};

export default {
	title: "Current weather component",
	component: CurrentWeather,
};
