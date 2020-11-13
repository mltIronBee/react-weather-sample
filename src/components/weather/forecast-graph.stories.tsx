import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { ForecastGraph } from "@components/weather";
import { IForecastGraphProps } from "@src/components/weather/forecast-graph";

const sampleData: IForecastGraphProps["data"] = [
	{ dayOfWeek: "Monday", min: 5, max: 13 },
	{ dayOfWeek: "Tuesday", min: 3, max: 11 },
	{ dayOfWeek: "Wednesday", min: 4, max: 9 },
	{ dayOfWeek: "Thursday", min: 4, max: 9 },
	{ dayOfWeek: "Friday", min: 4, max: 9 },
	{ dayOfWeek: "Saturday", min: 2, max: 8 },
	{ dayOfWeek: "Sunday", min: 1, max: 8 },
];

const Template: Story<ComponentProps<typeof ForecastGraph>> = ({ data, ...args }) => (
	<ForecastGraph data={data || sampleData} {...args} />
);

export const Default = Template.bind({});

export const Loading = Template.bind({});

Loading.args = {
	loading: true,
};

export const WithError = Template.bind({});

WithError.args = {
	hasError: true,
};

export default {
	title: "ForecastGraph",
	component: ForecastGraph,
	decorators: [
		(Story: React.ComponentType): JSX.Element => (
			<div style={{ width: "50%", height: 400 }}>
				<Story />
			</div>
		),
	],
};
