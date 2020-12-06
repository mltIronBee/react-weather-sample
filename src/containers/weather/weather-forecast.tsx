import React, { Fragment, useState, useCallback, useEffect, useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { ISnackbarContext, SnackbarContext } from "@containers/snackbar";
import { CitySearch, CurrentWeather, ForecastGraph, TabControls } from "@components/weather";
import { TabPanel } from "@components/common";
import { IAppState } from "@redux/reducers";
import { fetchWeatherForecast, IWeatherState } from "@redux/reducers/weather";
import { getCurrentLocation } from "@services/geolocation";
import useStyles from "@containers/weather/weather-forecast.styles";
import { currentWeatherSelector } from "@src/redux/selectors/weather";

export const WeatherForecast: React.FC = () => {
	const classes = useStyles();
	const [isGeolocationAvailable, setGeolocationAvailability] = useState(!!navigator.geolocation);
	const [searchValue, setSearchValue] = useState("");
	const [currentTab, setCurrentTab] = useState(0);
	const { isLoading, forecast, errorMessage } = useSelector<IAppState, IWeatherState>((state) => state.weather);
	const currentWeather = useSelector(currentWeatherSelector);
	const { snackbar } = useContext<ISnackbarContext>(SnackbarContext);
	const dispatch = useDispatch();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	useEffect(() => {
		if (errorMessage) {
			snackbar.error(errorMessage);
		}
	}, [snackbar, errorMessage]);

	const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
		setSearchValue(event.currentTarget.value);
	}, []);

	const handleSearch = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			dispatch(fetchWeatherForecast(searchValue));
		},
		[dispatch, searchValue],
	);

	const handleGeopositionRetrieval = useCallback(async () => {
		try {
			const result = await getCurrentLocation();

			setSearchValue(result.location);
		} catch (e) {
			snackbar.error(e.message);
			// If error is not axios related, then geolocation is not available/not allowed
			if (!e.isAxiosError) {
				setGeolocationAvailability(false);
			}
		}
	}, [snackbar]);

	const handleTabChange = useCallback((event: React.ChangeEvent<unknown>, value: number): void => {
		setCurrentTab(value);
	}, []);

	const handleChangeIndex = useCallback((index: number) => {
		setCurrentTab(index);
	}, []);

	return (
		<Fragment>
			<div className={classes.searchContainer}>
				<Grid container>
					<Grid item xs={12}>
						<CitySearch
							value={searchValue}
							searching={isLoading}
							geolocationAvailable={isGeolocationAvailable}
							errorMessage={errorMessage}
							onChange={handleChange}
							onSearch={handleSearch}
							onGetLocation={handleGeopositionRetrieval}
						/>
					</Grid>
				</Grid>
			</div>
			<Paper className={classes.graphContainer} elevation={2}>
				<Grid container>
					<Grid item xs={12}>
						<TabControls
							currentWeatherDisabled={currentWeather === null}
							currentTab={currentTab}
							onTabChange={handleTabChange}
							largeScreen={isLargeScreen}
						/>
						<SwipeableViews
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={currentTab}
							onChangeIndex={handleChangeIndex}
						>
							<TabPanel
								id="forecast-panel"
								aria-labelledby="forecast-tab"
								value={currentTab}
								index={0}
								dir={theme.direction}
								wrapperProps={{
									className: classes.chart,
								}}
							>
								<ForecastGraph data={forecast} loading={isLoading} hasError={!!errorMessage} />
							</TabPanel>
							<TabPanel
								id="current-weather-panel"
								aria-labelledby="current-weather-tab"
								value={currentTab}
								index={1}
								dir={theme.direction}
							>
								{currentWeather && <CurrentWeather {...currentWeather} />}
							</TabPanel>
						</SwipeableViews>
					</Grid>
				</Grid>
			</Paper>
		</Fragment>
	);
};
