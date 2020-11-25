import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
	createStyles({
		searchContainer: {
			margin: theme.spacing(),
		},
		graphContainer: {
			padding: theme.spacing(),
			margin: theme.spacing(),
		},
		chart: {
			[theme.breakpoints.down("sm")]: {
				height: 300,
			},
			[theme.breakpoints.up("sm")]: {
				height: 400,
			},
			[theme.breakpoints.up("lg")]: {
				height: 500,
			},
		},
	}),
);
