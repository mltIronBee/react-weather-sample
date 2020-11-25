import React from "react";
import { LoadingComponent } from "@components/common";
import useStyles from "@components/common/page-loader.styles";

export const PageLoader: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<LoadingComponent loading>
				<div className={classes.container}></div>
			</LoadingComponent>
		</div>
	);
};
