import React, { Fragment, useState, useCallback, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CitySearch, ForecastGraph } from "@components/weather";
import { IAppState } from "@redux/reducers";
import { fetchWeatherForecast, IWeatherState } from "@redux/reducers/weather";
import { getCurrentLocation } from "@services/geolocation";
import useStyles from "@containers/weather/weather-forecast.styles";

export const WeatherForecast: React.FC = () => {
	const classes = useStyles();
	const [isGeolocationAvailable, setGeolocationAvailability] = useState(!!navigator.geolocation);
	const [searchValue, setSearchValue] = useState("");
	const { isLoading, forecast, errorMessage } = useSelector<IAppState, IWeatherState>((state) => state.weather);
	const dispatch = useDispatch();

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage);
		}
	}, [errorMessage]);

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
			toast.error(e.message);
			// If error is not axios related, then geolocation is not available/not allowed
			if (!e.isAxiosError) {
				setGeolocationAvailability(false);
			}
		}
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
					<Grid item xs={12} className={classes.chart}>
						<ForecastGraph data={forecast} loading={isLoading} hasError={!!errorMessage} />
					</Grid>
				</Grid>
			</Paper>
		</Fragment>
	);
};
