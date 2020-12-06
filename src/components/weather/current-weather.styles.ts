import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
	sunriseSunsetContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "space-evenly",
	},
	sunriseIcon: {
		color: "#EC6E4C",
	},
	sunsetIcon: {
		color: "#EC6E4C",
	},
	weatherContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	weatherDescription: {
		display: "inline-block",
		textTransform: "capitalize",
	},
	weatherIcon: {
		display: "inline-block",
	},
	windDirectionIcon: (windDeg: number) => ({
		transform: `rotate(${windDeg}deg)`,
	}),
});
