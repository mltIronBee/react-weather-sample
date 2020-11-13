import React from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import { LoadingComponent } from "@components/common";
import useStyles from "@components/weather/forecast-graph.styles";

export interface IForecastGraphProps {
	data: {
		dayOfWeek: string;
		min: number;
		max: number;
	}[];
	loading?: boolean;
	hasError?: boolean;
}

export const ForecastGraph: React.FC<IForecastGraphProps> = ({ data, loading = false, hasError = false }) => {
	const classes = useStyles();
	const minFillColor = blue[600];
	const maxFillColor = amber[900];

	if (hasError) {
		return (
			<div className={classes.errorContainer}>
				<Typography variant="h3" component="span" gutterBottom>
					Oops!
				</Typography>
				<Typography>An error has occurred while loading graph data</Typography>
			</div>
		);
	}

	return (
		<LoadingComponent loading={loading}>
			<ResponsiveContainer>
				<BarChart data={data}>
					<XAxis dataKey="dayOfWeek" />
					<YAxis />
					<Tooltip />
					<Legend formatter={(value) => <span className={classes.legendLabel}>{value}</span>} />
					<CartesianGrid strokeDasharray="3 3 " />
					<Bar dataKey="min" fill={minFillColor} />
					<Bar dataKey="max" fill={maxFillColor} />
				</BarChart>
			</ResponsiveContainer>
		</LoadingComponent>
	);
};
