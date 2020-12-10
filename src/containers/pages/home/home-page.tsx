import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { WeatherForecast } from "@containers/weather";
import useStyles from "@containers/pages/home/home-page.styles";
import { LanguageSelector } from "@components/language-selector";

const HomePage: React.FC = () => {
	const classes = useStyles();
	const { t } = useTranslation(["home"]);

	return (
		<Grid container className={classes.pageContainer}>
			<LanguageSelector className={classes.languageSelector} />
			<Grid container className={classes.row}>
				<Grid item md={8} sm={10} xs={12}>
					<Typography className={classes.title} variant="h1">
						{t("home:title")}
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
