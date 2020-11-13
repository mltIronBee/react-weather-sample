import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import useStyles from "@components/common/loading-component.styles";

export interface ILoadingComponentProps {
	loading: boolean;
	children: JSX.Element;
}

export const LoadingComponent: React.FC<ILoadingComponentProps> = (props) => {
	const classes = useStyles();

	if (!props.loading) {
		return props.children;
	}

	return (
		<div className={classes.loadingWrapper}>
			<div className={classes.loadingIndicatorContainer}>
				<CircularProgress />
				<Typography>Loading...</Typography>
			</div>
			{props.children}
		</div>
	);
};
