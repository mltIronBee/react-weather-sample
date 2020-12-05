import React, { ComponentProps, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { Story } from "@storybook/react/types-6-0";
import { ISnackbarProps, Snackbar } from "@components/snackbar";

const SnackbarToggler: React.FC<Omit<ISnackbarProps, "open">> = (props) => {
	const [isOpened, setIsOpened] = useState(true);

	const toggleOpen = useCallback(() => {
		setIsOpened((prevIsOpened) => !prevIsOpened);
	}, []);

	return (
		<div>
			<Button color="primary" onClick={toggleOpen} variant="contained">
				Toggle snackbar
			</Button>
			<Snackbar open={isOpened} {...props} />
		</div>
	);
};

const Template: Story<ComponentProps<typeof SnackbarToggler>> = (args) => <SnackbarToggler {...args} />;

export const Default = Template.bind({});

Default.args = {
	message: "Default snack",
};

export const Success = Template.bind({});

Success.args = {
	type: "success",
	message: "Success snack",
};

export const Info = Template.bind({});

Info.args = {
	type: "info",
	message: "Info snack",
};

export const Warning = Template.bind({});

Warning.args = {
	type: "warning",
	message: "Warning snack",
};

export const Error = Template.bind({});

Error.args = {
	type: "error",
	message: "Error snack",
};

export default {
	title: "Snackbar component",
	component: Snackbar,
};
