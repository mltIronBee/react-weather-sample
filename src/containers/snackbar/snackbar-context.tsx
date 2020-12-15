import React, { createContext, useReducer, useCallback, useEffect, Reducer, useMemo } from "react";
import { Snackbar } from "@components/snackbar";

export interface ISnackbarContext {
	snackbar: {
		show: (message: string, type?: SnackbarType) => void;
		success: (message: string) => void;
		info: (message: string) => void;
		warning: (message: string) => void;
		error: (message: string) => void;
	};
}

export type SnackbarType = "default" | "success" | "info" | "warning" | "error";

interface ISnackbarMessage {
	readonly type: SnackbarType;
	readonly message: string;
	readonly key: number;
}

interface ISnackbarProviderState {
	readonly isOpened: boolean;
	readonly isHidden: boolean;
	readonly messageQueue: ISnackbarMessage[];
}

interface IOpenSnackbarAction {
	type: "OPEN_SNACKBAR";
}

interface IAddMessageAction {
	type: "ADD_MESSAGE";
	payload: ISnackbarMessage;
}

interface IRemoveMessageAction {
	type: "REMOVE_MESSAGE";
}

interface ICloseSnackbarAction {
	type: "CLOSE_SNACKBAR";
}

type SnackbarActions = IOpenSnackbarAction | IAddMessageAction | ICloseSnackbarAction | IRemoveMessageAction;
type SnackbarReducer = Reducer<ISnackbarProviderState, SnackbarActions>;

const initialState: ISnackbarProviderState = {
	isOpened: false,
	isHidden: true,
	messageQueue: [],
};

const addMessage = (payload: IAddMessageAction["payload"]): IAddMessageAction => ({
	type: "ADD_MESSAGE",
	payload,
});

const closeSnackbar: ICloseSnackbarAction = {
	type: "CLOSE_SNACKBAR",
};

const openSnackbar: IOpenSnackbarAction = {
	type: "OPEN_SNACKBAR",
};

const removeMessage: IRemoveMessageAction = {
	type: "REMOVE_MESSAGE",
};

const snackbarReducer: SnackbarReducer = (state, action) => {
	switch (action.type) {
		case "OPEN_SNACKBAR":
			return {
				...state,
				isOpened: true,
				isHidden: false,
			};
		case "ADD_MESSAGE":
			return {
				...state,
				messageQueue: [
					...state.messageQueue,
					{ type: action.payload.type, message: action.payload.message, key: action.payload.key },
				],
			};
		case "CLOSE_SNACKBAR":
			return {
				...state,
				isOpened: false,
			};
		case "REMOVE_MESSAGE":
			return {
				...state,
				isHidden: true,
				messageQueue: state.messageQueue.slice(1),
			};
		default:
			return state;
	}
};

// We don't have to export this normally, but it would be good for testing purposes to expose this function.
// So, we're exporting it, but only in test mode. In any other modes this part will be cut out by the bundler
if (process.env.NODE_ENV === "test") {
	exports.snackbarReducer = snackbarReducer;
}

/* istanbul ignore next: no point in testing placeholder functions */
export const SnackbarContext = createContext<ISnackbarContext>({
	snackbar: {
		show: () => null,
		success: () => null,
		info: () => null,
		warning: () => null,
		error: () => null,
	},
});

export const SnackbarProvider: React.FC = (props) => {
	const [state, dispatch] = useReducer(snackbarReducer, initialState);

	useEffect(() => {
		if (state.messageQueue.length > 0 && state.isHidden) {
			dispatch(openSnackbar);
		}
	}, [state.isHidden, state.messageQueue.length]);

	const handleShowMessage = useCallback((message: string, type: SnackbarType = "default") => {
		dispatch(addMessage({ type, message, key: Date.now() }));
	}, []);

	const handleSuccess = useCallback(
		(message: string) => {
			handleShowMessage(message, "success");
		},
		[handleShowMessage],
	);

	const handleInfo = useCallback(
		(message: string) => {
			handleShowMessage(message, "info");
		},
		[handleShowMessage],
	);

	const handleWarning = useCallback(
		(message: string) => {
			handleShowMessage(message, "warning");
		},
		[handleShowMessage],
	);

	const handleError = useCallback(
		(message: string) => {
			handleShowMessage(message, "error");
		},
		[handleShowMessage],
	);

	const handleClose = useCallback((_: React.SyntheticEvent | MouseEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		dispatch(closeSnackbar);
	}, []);

	const handleExited = useCallback(() => {
		dispatch(removeMessage);
	}, []);

	// Without memoisation of this context, story for the weather forecast container is going ham and recursively calls
	// effect, that is responsible for error snack
	const contextValue = useMemo<ISnackbarContext>(
		() => ({
			snackbar: {
				show: handleShowMessage,
				success: handleSuccess,
				info: handleInfo,
				warning: handleWarning,
				error: handleError,
			},
		}),
		[handleError, handleInfo, handleShowMessage, handleSuccess, handleWarning],
	);

	return (
		<SnackbarContext.Provider value={contextValue}>
			{props.children}
			<Snackbar
				open={state.isOpened}
				message={state.messageQueue[0]?.message ?? ""}
				type={state.messageQueue[0]?.type}
				onClose={handleClose}
				onExited={handleExited}
			/>
		</SnackbarContext.Provider>
	);
};
