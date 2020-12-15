import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { ForecastGraph } from "@components/weather";
import { IForecastGraphProps } from "@components/weather/forecast-graph";

const sampleData: IForecastGraphProps["data"] = [
	{ dayOfWeek: 1, minTemperature: 5, maxTemperature: 13 },
	{ dayOfWeek: 2, minTemperature: 3, maxTemperature: 11 },
	{ dayOfWeek: 3, minTemperature: 4, maxTemperature: 9 },
	{ dayOfWeek: 4, minTemperature: 4, maxTemperature: 9 },
	{ dayOfWeek: 5, minTemperature: 4, maxTemperature: 9 },
	{ dayOfWeek: 6, minTemperature: 2, maxTemperature: 8 },
	{ dayOfWeek: 7, minTemperature: 1, maxTemperature: 8 },
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
