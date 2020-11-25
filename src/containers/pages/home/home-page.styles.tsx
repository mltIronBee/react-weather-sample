import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
	pageContainer: {
		flexDirection: "column",
		width: "100%",
		minHeight: "100vh",
		justifyContent: "center",
	},
	row: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		textAlign: "center",
		paddingLeft: theme.spacing(),
		paddingRight: theme.spacing(),
		[theme.breakpoints.down("xl")]: {
			fontSize: "5.9rem",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "4rem",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "3.75rem",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "2.1rem",
		},
	},
}));
