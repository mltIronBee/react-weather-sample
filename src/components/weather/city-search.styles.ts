import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

export default makeStyles((theme: Theme) =>
	createStyles({
		loadingIcon: {
			padding: theme.spacing() * 1.5,
		},
	}),
);
