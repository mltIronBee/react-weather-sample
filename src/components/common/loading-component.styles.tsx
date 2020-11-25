import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
	createStyles({
		loadingWrapper: {
			position: "relative",
			display: "inline-block",
			height: "100%",
			width: "100%",
		},
		loadingIndicatorContainer: {
			display: "flex",
			position: "absolute",
			backgroundColor: "rgba(255, 255, 255, 0.75)",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			zIndex: theme.zIndex.mobileStepper - 1,
		},
	}),
);
