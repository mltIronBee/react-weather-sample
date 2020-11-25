import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { GraphTooltip } from "@components/weather/graph-tooltip";

const Template: Story<ComponentProps<typeof GraphTooltip>> = (args) => <GraphTooltip {...args} />;

export const Default = Template.bind({});

Default.args = {
	active: true,
	label: "Monday",
	payload: [
		{ name: "Min temperature", value: -5 },
		{ name: "Max temperature", value: 5 },
	],
};

export default {
	title: "Customized chart tooltip",
	component: GraphTooltip,
};
