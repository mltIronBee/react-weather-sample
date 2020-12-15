import React, { memo, useMemo } from "react";
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
import { invertDirection } from "@utils/angle";
import { useTranslation } from "react-i18next";

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
		return "current-weather:north";
	} else if (windDeg > 22.5 && windDeg <= 67.5) {
		return "current-weather:north-east";
	} else if (windDeg > 67.5 && windDeg <= 112.5) {
		return "current-weather:east";
	} else if (windDeg > 112.5 && windDeg <= 157.5) {
		return "current-weather:south-east";
	} else if (windDeg > 157.5 && windDeg <= 202.5) {
		return "current-weather:south";
	} else if (windDeg > 202.5 && windDeg <= 247.5) {
		return "current-weather:south-west";
	} else if (windDeg > 247.5 && windDeg <= 292.5) {
		return "current-weather:west";
	}

	return "current-weather:north-west";
};

export const CurrentWeather: React.FC<ICurrentWeatherProps> = memo((props) => {
	const invertedAngle = useMemo(() => invertDirection(props.windDeg), [props.windDeg]);
	const classes = useStyles(invertedAngle);
	const { t } = useTranslation(["current-weather", "units"]);

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
						{t("current-weather:feels-like")}: {formatTemperature(props.feelsLike)}&deg;
					</Typography>
					<Typography gutterBottom component="span" className={classes.sunriseSunsetContainer}>
						<Typography align="center" variant="h5" display="inline">
							<SunriseIcon className={classes.sunriseIcon} /> {t("current-weather:sunrise-at")} {props.sunrise}
						</Typography>
						<Typography align="center" variant="h5" display="inline">
							<SunsetIcon className={classes.sunsetIcon} /> {t("current-weather:sunset-at")} {props.sunset}
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
						<ListItemText primary={`${props.pressure} hPa`} secondary={t("current-weather:atmospheric-pressure")} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<DropIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.humidity} %`} secondary={t("current-weather:humidity")} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<CloudIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.clouds} %`} secondary={t("current-weather:clouds")} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<SunIcon />
						</ListItemIcon>
						<ListItemText primary={props.uvIndex} secondary={t("current-weather:uv-index")} />
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<VisibilityIcon />
						</ListItemIcon>
						<ListItemText primary={`${props.visibility} ${t("units:m")}`} secondary={t("current-weather:visibility")} />
					</ListItem>
					<Divider />
					{props.rain && (
						<React.Fragment>
							<ListItem>
								<ListItemIcon>
									<RainIcon />
								</ListItemIcon>
								<ListItemText primary={`${props.rain} ${t("units:mm")}`} secondary={t("current-weather:rain")} />
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
								<ListItemText primary={`${props.snow} ${t("units:mm")}`} secondary={t("current-weather:snow")} />
							</ListItem>
							<Divider />
						</React.Fragment>
					)}
					<ListItem>
						<ListItemIcon>
							<SpeedIcon />
						</ListItemIcon>
						<ListItemText
							primary={`${props.windSpeed} ${t("units:mps")}`}
							secondary={t("current-weather:wind-speed")}
						/>
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemIcon>
							<ArrowUpwardIcon className={classes.windDirectionIcon} />
						</ListItemIcon>
						<ListItemText
							primary={t(getReadableWindDirection(invertedAngle))}
							secondary={t("current-weather:wind-direction")}
						/>
					</ListItem>
				</List>
			</Grid>
		</Grid>
	);
});

CurrentWeather.displayName = "CurrentWeather";
