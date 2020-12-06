import React, { HTMLAttributes } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";

export interface ITabPanelProps<T = any> extends HTMLAttributes<HTMLDivElement> {
	value: T;
	index: T;
	wrapperProps?: BoxProps;
	children: React.ReactNode;
}

export function TabPanel<T = any>({ value, index, children, wrapperProps, ...props }: ITabPanelProps<T>): JSX.Element {
	return (
		<div role="tabpanel" hidden={value !== index} {...props}>
			<Box {...wrapperProps} p={2}>
				{children}
			</Box>
		</div>
	);
}
