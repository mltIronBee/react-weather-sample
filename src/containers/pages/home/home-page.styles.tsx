import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
	pageContainer: {
		[theme.breakpoints.up("md")]: {
			justifyContent: "center",
		},
		flexDirection: "column",
		width: "100%",
		minHeight: "100vh",
		paddingTop: theme.spacing(8),
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
	languageSelector: {
		position: "absolute",
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
}));
