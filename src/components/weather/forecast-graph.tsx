import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Legend,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	ReferenceLine,
} from "recharts";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import SearchIcon from "@material-ui/icons/Search";
import { LoadingComponent } from "@components/common";
import useStyles from "@components/weather/forecast-graph.styles";
import { GraphTooltip } from "@src/components/weather/graph-tooltip";

export interface IForecastGraphProps {
	data: {
		dayOfWeek: string;
		minTemperature: number;
		maxTemperature: number;
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
			<LoadingComponent loading={loading}>
				<div className={classes.errorContainer}>
					<Typography variant="h3" component="span" gutterBottom>
						Oops!
					</Typography>
					<Typography>An error has occurred while loading graph data</Typography>
				</div>
			</LoadingComponent>
		);
	}

	if (data.length === 0) {
		return (
			<LoadingComponent loading={loading}>
				<div className={classes.errorContainer}>
					<Typography variant="h3" component="span" gutterBottom>
						No data!
					</Typography>
					<Typography>
						To display forecast graph enter your city name in search field and hit <SearchIcon /> button
					</Typography>
				</div>
			</LoadingComponent>
		);
	}

	return (
		<LoadingComponent loading={loading}>
			<ResponsiveContainer>
				<BarChart data={data} margin={{ right: 16 }}>
					<XAxis tickFormatter={(value) => value.slice(0, 3)} dataKey="dayOfWeek" />
					<YAxis tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}°`} />
					<Tooltip content={<GraphTooltip />} />
					<Legend
						formatter={(value) => (
							<span className={classes.legendLabel}>{value === "minTemperature" ? "Min" : "Max"}</span>
						)}
					/>
					<ReferenceLine y={0} />
					<CartesianGrid strokeDasharray="3 3 " />
					<Bar dataKey="minTemperature" fill={minFillColor} />
					<Bar dataKey="maxTemperature" fill={maxFillColor} />
				</BarChart>
			</ResponsiveContainer>
		</LoadingComponent>
	);
};
