import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { LoadingComponent } from "@components/common";

const Template: Story<ComponentProps<typeof LoadingComponent>> = (args) => (
	<LoadingComponent {...args}>
		<div style={{ width: "100%", height: "100%", backgroundColor: "#f00" }} />
	</LoadingComponent>
);

export const Default = Template.bind({});

export const Loading = Template.bind({});

Loading.args = {
	loading: true,
};

export default {
	title: "LoadingComponent",
	component: LoadingComponent,
	decorators: [
		(Story: React.ComponentType): JSX.Element => (
			<div style={{ width: 500, height: 500 }}>
				<Story />
			</div>
		),
	],
};
