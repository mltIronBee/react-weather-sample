import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { LoadingComponent } from "@components/common";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const Template: Story<ComponentProps<typeof LoadingComponent>> = (args) => (
	<LoadingComponent {...args}>
		<Grid container spacing={3}>
			<Grid item xs={3}>
				<Skeleton animation={false} variant="circle">
					<Avatar />
				</Skeleton>
				{Array.from(new Array(5)).map((_, index) => (
					<Typography key={index}>
						<Skeleton animation={false} />
					</Typography>
				))}
			</Grid>
			<Grid item xs={9}>
				<Typography variant="h3">
					<Skeleton animation={false} />
				</Typography>
				{Array.from(new Array(10)).map((_, index) => (
					<Typography key={index} variant={index % 2 === 0 ? "body1" : "body2"}>
						<Skeleton animation={false} />
					</Typography>
				))}
			</Grid>
		</Grid>
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
};
