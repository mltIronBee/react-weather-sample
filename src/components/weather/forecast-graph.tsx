import React, { memo } from "react";
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
import useStyles from "@components/weather/forecast-graph.styles";
import { GraphTooltip } from "@components/weather/graph-tooltip";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon";

export interface IForecastGraphProps {
	data: {
		dayOfWeek: number;
		minTemperature: number;
		maxTemperature: number;
	}[];
	hasError?: boolean;
}

const formatXAxisTick = (weekday: number, language: string): string =>
	DateTime.local().set({ weekday }).setLocale(language).weekdayShort;

export const ForecastGraph: React.FC<IForecastGraphProps> = memo(({ data, hasError = false }) => {
	const classes = useStyles();
	const minFillColor = blue[600];
	const maxFillColor = amber[900];
	const {
		t,
		i18n: { language },
	} = useTranslation(["forecast", "common"]);

	if (hasError) {
		return (
			<div className={classes.errorContainer}>
				<Typography variant="h3" component="span" gutterBottom>
					{t("common:oops")}
				</Typography>
				<Typography>{t("forecast:load-error")}</Typography>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className={classes.errorContainer}>
				<Typography variant="h3" component="span" gutterBottom>
					{t("common:no-data")}
				</Typography>
				<Typography>
					{t("forecast:no-data-hint")}&nbsp;
					<SearchIcon />
				</Typography>
			</div>
		);
	}

	return (
		<ResponsiveContainer>
			<BarChart data={data} margin={{ right: 16 }}>
				<XAxis tickFormatter={(value: number) => formatXAxisTick(value, language)} dataKey="dayOfWeek" />
				<YAxis tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}°`} />
				<Tooltip content={<GraphTooltip />} />
				<Legend
					formatter={(value) => (
						<span className={classes.legendLabel}>
							{value === "minTemperature" ? t("forecast:legend-min") : t("forecast:legend-max")}
						</span>
					)}
				/>
				<ReferenceLine y={0} />
				<CartesianGrid strokeDasharray="3 3 " />
				<Bar dataKey="minTemperature" fill={minFillColor} />
				<Bar dataKey="maxTemperature" fill={maxFillColor} />
			</BarChart>
		</ResponsiveContainer>
	);
});

ForecastGraph.displayName = "ForecastGraph";
