import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			flexDirection: "column",
			position: "absolute",
			color:
				theme.palette.type === "light"
					? theme.palette.text.primary /* istanbul ignore next: palette type does not require test coverage */
					: theme.palette.primary.contrastText,
			backgroundColor:
				theme.palette.type === "light"
					? "rgba(255, 255, 255, 0.5)" /* istanbul ignore next: palette type does not require test coverage */
					: "rgba(0, 0, 0, 0.5)",
		},
		backdropContainer: {
			position: "relative",
		},
	}),
);
