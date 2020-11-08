import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { CitySearch } from "@components/weather";

const Template: Story<ComponentProps<typeof CitySearch>> = (args) => <CitySearch {...args} />;

export const Default = Template.bind({});

Default.args = {
	value: "Odesa",
};

export const Loading = Template.bind({});

Loading.args = {
	value: "Odesa",
	searching: true,
};

export const WithError = Template.bind({});

WithError.args = {
	value: "Lorem Ipsum",
	errorMessage: "Search error",
};

export default {
	title: "CitySearch",
	component: CitySearch,
};
