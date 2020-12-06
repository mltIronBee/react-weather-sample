import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TooltipProps } from "recharts";
import { Divider } from "@material-ui/core";
import useStyles from "@components/weather/graph-tooltip.styles";

const formatName = (name: string): string => (name === "maxTemperature" ? "Max Temperature" : "Min Temperature");

export const GraphTooltip: React.FC<TooltipProps> = (props) => {
	const classes = useStyles();

	if (!props.active || !props.payload) {
		return null;
	}

	return (
		<Paper className={classes.container} elevation={4}>
			<Typography variant="h6">{props.label}</Typography>
			<Divider className={classes.divider} />
			<Typography className={classes.minTemperatureLabel}>
				{formatName(props.payload[0].name)}: {props.payload[0].value > 0 ? "+" : ""}
				{Math.round(+props.payload[0].value)}
			</Typography>
			<Typography className={classes.maxTemperatureLabel}>
				{formatName(props.payload[1].name)}: {props.payload[1].value > 0 ? "+" : ""}
				{Math.round(+props.payload[1].value)}
			</Typography>
		</Paper>
	);
};
