import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import blue from "@material-ui/core/colors/blue";

export default makeStyles((theme: Theme) =>
	createStyles({
		container: {
			padding: theme.spacing(),
		},
		minTemperatureLabel: {
			color: blue[600],
		},
		maxTemperatureLabel: {
			color: amber[900],
		},
		divider: {
			marginTop: theme.spacing(0.5),
			marginBottom: theme.spacing(),
		},
	}),
);
