import React from "react";
import Alert from "@material-ui/lab/Alert";
import MuiSnackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export interface ISnackbarProps {
	type?: "default" | "info" | "success" | "error" | "warning";
	message: string;
	open: boolean;
	onClose: (event: React.SyntheticEvent | MouseEvent, reason?: string) => void;
	onExited: () => void;
}

export const Snackbar: React.FC<ISnackbarProps> = (props) => {
	if (props.type === "default") {
		return (
			<MuiSnackbar
				open={props.open}
				onClose={props.onClose}
				onExited={props.onExited}
				autoHideDuration={6000}
				message={props.message}
				action={
					<IconButton size="small" aria-label="close" onClick={props.onClose}>
						<CloseIcon />
					</IconButton>
				}
			/>
		);
	}

	return (
		<MuiSnackbar open={props.open} onClose={props.onClose} autoHideDuration={6000} onExited={props.onExited}>
			<Alert elevation={2} variant="filled" severity={props.type} onClose={props.onClose}>
				{props.message}
			</Alert>
		</MuiSnackbar>
	);
};

Snackbar.defaultProps = {
	type: "default",
};
