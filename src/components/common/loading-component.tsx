import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
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
		<div className={classes.backdropContainer}>
			<Backdrop className={classes.backdrop} open={props.loading}>
				<CircularProgress />
				<Typography>Loading...</Typography>
			</Backdrop>
			{props.children}
		</div>
	);
};
