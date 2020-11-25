import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { ForecastGraph } from "@components/weather";
import { IForecastGraphProps } from "@src/components/weather/forecast-graph";

const sampleData: IForecastGraphProps["data"] = [
	{ dayOfWeek: "Monday", minTemperature: 5, maxTemperature: 13 },
	{ dayOfWeek: "Tuesday", minTemperature: 3, maxTemperature: 11 },
	{ dayOfWeek: "Wednesday", minTemperature: 4, maxTemperature: 9 },
	{ dayOfWeek: "Thursday", minTemperature: 4, maxTemperature: 9 },
	{ dayOfWeek: "Friday", minTemperature: 4, maxTemperature: 9 },
	{ dayOfWeek: "Saturday", minTemperature: 2, maxTemperature: 8 },
	{ dayOfWeek: "Sunday", minTemperature: 1, maxTemperature: 8 },
];

const Template: Story<ComponentProps<typeof ForecastGraph>> = ({ data, ...args }) => (
	<ForecastGraph data={data || sampleData} {...args} />
);

export const Default = Template.bind({});

export const WithoutData = Template.bind({});

WithoutData.args = {
	data: [],
};

export const WithError = Template.bind({});

WithError.args = {
	hasError: true,
};

export const LoadingWithoutData = Template.bind({});

LoadingWithoutData.args = {
	data: [],
	loading: true,
};

export const LoadingWithData = Template.bind({});

LoadingWithData.args = {
	loading: true,
};

export const LoadingWithError = Template.bind({});

LoadingWithError.args = {
	loading: true,
	hasError: true,
};

export default {
	title: "Forecast chart component",
	component: ForecastGraph,
	decorators: [
		(Story: React.ComponentType): JSX.Element => (
			<div style={{ width: "50%", height: 400 }}>
				<Story />
			</div>
		),
	],
};
