import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { WeatherForecast } from "@containers/weather";
import useStyles from "@containers/pages/home/home-page.styles";

const HomePage: React.FC = () => {
	const classes = useStyles();

	return (
		<Grid container className={classes.pageContainer}>
			<Grid container className={classes.row}>
				<Grid item md={8} sm={10} xs={12}>
					<Typography className={classes.title} variant="h1">
						React Weather forecast
					</Typography>
				</Grid>
			</Grid>
			<Grid container className={classes.row}>
				<Grid item md={8} sm={10} xs={12}>
					<WeatherForecast />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default HomePage;
