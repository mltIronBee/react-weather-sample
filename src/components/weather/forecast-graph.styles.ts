import { makeStyles, createStyles } from "@material-ui/styles";

export default makeStyles(() =>
	createStyles({
		legendLabel: {
			textTransform: "capitalize",
		},
		errorContainer: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: "100%",
		},
	}),
);
