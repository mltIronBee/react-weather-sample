import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
	createStyles({
		loadingIcon: {
			padding: theme.spacing(1.5),
		},
		iconButton: {
			color: theme.palette.primary.main,
		},
	}),
);
