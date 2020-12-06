import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import useStyles from "@components/weather/current-weather.styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DownIcon from "@material-ui/icons/VerticalAlignBottom";
import CloudIcon from "@material-ui/icons/Cloud";
import DropIcon from "@material-ui/icons/Opacity";
import SunIcon from "@material-ui/icons/WbSunny";
import SnowIcon from "@material-ui/icons/AcUnit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SpeedIcon from "@material-ui/icons/Speed";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import RainIcon from "@components/icons/rain";
import SunriseIcon from "@components/icons/sunrise";
import SunsetIcon from "@components/icons/sunset";

export interface ICurrentWeatherProps {
	date: string;
	sunrise: string;
	sunset: string;
	temperature: number;
	feelsLike: number;
	pressure: number;
	humidity: number;
	clouds: number;
	uvIndex: number;
	visibility: number;
	rain?: number;
	snow?: number;
	windSpeed: number;
	windDeg: number;
	weatherIcon: string;
	weatherDescription: string;
}

const formatTemperature = (temperature: number): string =>
	temperature > 0 ? `+${Math.round(temperature)}` : Math.round(temperature).toString(10);

const getReadableWindDirection = (windDeg: number): string => {
	if (windDeg > 337.5 || windDeg <= 22.5) {
		return "North";
	} else if (windDeg > 22.5 && windDeg <= 67.5) {
		return "North-East";
	} else if (windDeg > 67.5 && windDeg <= 112.5) {
		return "East";
	} else if (windDeg > 112.5 && windDeg <= 157.5) {
		return "South-East";
	} else if (windDeg > 157.5 && windDeg <= 202.5) {
		return "South";
	} else if (windDeg > 202.5 && windDeg <= 247.5) {
		return "South-West";
	} else if (windDeg > 247.5 && windDeg <= 292.5) {
		return "West";
	}

	return "North-West";
};

export const CurrentWeather: React.FC<ICurrentWeatherProps> = memo((props) => {
	const classes = useStyles(props.windDeg);

	return (
		<Grid container>
			<Grid item xs={12} md={5} lg={4} xl={3}>
				<Grid container direction="column" justify="center" alignItems="center">
					<Typography>{props.date}</Typography>
					<span className={classes.weatherContainer}>
						<img className={classes.weatherIcon} alt={props.weatherDescription} src={props.weatherIcon} />
						<Typography className={classes.weatherDescription} variant="h4">
							{props.weatherDescription}
						</Typography>
					</span>
					<Typography gutterBottom variant="h2">
						{formatTemperature(props.temperature)}&deg;
					</Typography>
					<Typography gutterBottom variant="h4">
						Feels like: {formatTemperature(props.feelsLike)}&deg;
					</Typography>
					<Typography gutterBottom component="span" className={classes.sunriseSunsetContainer}>
						<Typography align="center" variant="h5" display="inline">
							<SunriseIcon className={classes.sunriseIcon} /> Sunrise at {props.sunrise}
						</Typography>
						<Typography align="center" variant="h5" display="inline">
							<SunsetIcon className={classes.sunsetIcon} /> Sunset at {props.sunset}
						</Typography>
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} md={7} lg={8} xl={9}>
				<List>
					<ListItem>
						<ListItemIcon>
							<DownIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.pressure} hPa`} secondary="Atmospheric pressure" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<DropIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.humidity} %`} secondary="Humidity" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<CloudIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.clouds} %`} secondary="Clouds" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<SunIcon />
						</ListItemIcon>
						<ListItemText primary={props.uvIndex} secondary="Midday UV Index" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<VisibilityIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.visibility} m`} secondary="Visibility" />
					</ListItem>
					<Divider />
					{props.rain && (
						<React.Fragment>
							<ListItem>
								<ListItemIcon>
									<RainIcon />
								</ListItemIcon>
								<ListItemText primary={`${props.rain} mm`} secondary="Rain last 1 hour" />
							</ListItem>
							<Divider />
						</React.Fragment>
					)}
					{props.snow && (
						<React.Fragment>
							<ListItem>
								<ListItemIcon>
									<SnowIcon />
								</ListItemIcon>
								<ListItemText primary={`${props.snow} mm`} secondary="Snow last 1 hour" />
							</ListItem>
							<Divider />
						</React.Fragment>
					)}
					<ListItem>
						<ListItemIcon>
							<SpeedIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.windSpeed} m/s`} secondary="Wind speed" />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<ArrowUpwardIcon className={classes.windDirectionIcon} />
						</ListItemIcon>
						<ListItemText primary={getReadableWindDirection(props.windDeg)} secondary="Wind direction" />
					</ListItem>
				</List>
			</Grid>
		</Grid>
	);
});

CurrentWeather.displayName = "CurrentWeather";
