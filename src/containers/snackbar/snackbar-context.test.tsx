import React, { useContext } from "react";
import { render, screen, fireEvent, waitFor } from "@utils/test-utils";
import { SnackbarProvider, SnackbarContext } from "@containers/snackbar";
import { SnackbarType } from "@containers/snackbar/snackbar-context";
import "@testing-library/jest-dom/extend-expect";

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

describe("Snackbar container", () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { snackbarReducer } = require("@containers/snackbar/snackbar-context");
	const MessageSender: React.FC<{ message: string }> = (props) => {
		const { snackbar } = useContext(SnackbarContext);

		return (
			<div>
				<button data-testid="default" onClick={() => snackbar.show(props.message + " default")} />
				<button data-testid="success" onClick={() => snackbar.success(props.message + " success")} />
				<button data-testid="info" onClick={() => snackbar.info(props.message + " info")} />
				<button data-testid="warning" onClick={() => snackbar.warning(props.message + " warning")} />
				<button data-testid="error" onClick={() => snackbar.error(props.message + " error")} />
			</div>
		);
	};

	it("Should correctly queue up messages in snackbar queue and show them one by one", async () => {
		const testMessage = "This is a test";

		render(
			<SnackbarProvider>
				<MessageSender message={testMessage} />
			</SnackbarProvider>,
		);

		const showDefaultButton = screen.getByTestId(/^default$/i);
		const showSuccessButton = screen.getByTestId(/^success$/i);
		const showInfoButton = screen.getByTestId(/^info$/i);
		const showWarningButton = screen.getByTestId(/^warning$/i);
		const showErrorButton = screen.getByTestId(/^error$/i);

		fireEvent.click(showDefaultButton);
		fireEvent.click(showSuccessButton);
		fireEvent.click(showInfoButton);
		fireEvent.click(showWarningButton);
		fireEvent.click(showErrorButton);

		const queryByType = (type: SnackbarType): HTMLElement | null => screen.queryByText(`${testMessage} ${type}`);
		const queryAllSnackbars = (): Array<HTMLElement | null> => [
			queryByType("default"),
			queryByType("success"),
			queryByType("info"),
			queryByType("warning"),
			queryByType("error"),
		];
		const closeSnackbar = (): boolean => fireEvent.click(screen.getByLabelText(/^close$/i));

		let defaultSnackbar: HTMLElement | null = await waitFor(() => screen.findByText(testMessage + " default"));
		let [, successSnackbar, infoSnackbar, warningSnackbar, errorSnackbar] = queryAllSnackbars();

		expect(defaultSnackbar).toBeInTheDocument();
		expect(successSnackbar).not.toBeInTheDocument();
		expect(infoSnackbar).not.toBeInTheDocument();
		expect(warningSnackbar).not.toBeInTheDocument();
		expect(errorSnackbar).not.toBeInTheDocument();

		closeSnackbar();

		successSnackbar = await waitFor(() => screen.findByText(`${testMessage} success`));
		[defaultSnackbar, , infoSnackbar, warningSnackbar, errorSnackbar] = queryAllSnackbars();

		expect(defaultSnackbar).not.toBeInTheDocument();
		expect(successSnackbar).toBeInTheDocument();
		expect(infoSnackbar).not.toBeInTheDocument();
		expect(warningSnackbar).not.toBeInTheDocument();
		expect(errorSnackbar).not.toBeInTheDocument();

		closeSnackbar();

		infoSnackbar = await waitFor(() => screen.findByText(`${testMessage} info`));
		[defaultSnackbar, successSnackbar, , warningSnackbar, errorSnackbar] = queryAllSnackbars();

		expect(defaultSnackbar).not.toBeInTheDocument();
		expect(successSnackbar).not.toBeInTheDocument();
		expect(infoSnackbar).toBeInTheDocument();
		expect(warningSnackbar).not.toBeInTheDocument();
		expect(errorSnackbar).not.toBeInTheDocument();

		closeSnackbar();

		warningSnackbar = await waitFor(() => screen.findByText(`${testMessage} warning`));

		[defaultSnackbar, successSnackbar, infoSnackbar, , errorSnackbar] = queryAllSnackbars();

		expect(defaultSnackbar).not.toBeInTheDocument();
		expect(successSnackbar).not.toBeInTheDocument();
		expect(infoSnackbar).not.toBeInTheDocument();
		expect(warningSnackbar).toBeInTheDocument();
		expect(errorSnackbar).not.toBeInTheDocument();

		closeSnackbar();

		errorSnackbar = await waitFor(() => screen.findByText(`${testMessage} error`));

		[defaultSnackbar, successSnackbar, infoSnackbar, warningSnackbar] = queryAllSnackbars();

		expect(defaultSnackbar).not.toBeInTheDocument();
		expect(successSnackbar).not.toBeInTheDocument();
		expect(infoSnackbar).not.toBeInTheDocument();
		expect(warningSnackbar).not.toBeInTheDocument();
		expect(errorSnackbar).toBeInTheDocument();
	});

	describe("Snackbar Provider reducer", () => {
		const generateRandomMessages = (): ISnackbarMessage[] => {
			const amount = Math.floor(Math.random() * 5 + 5); // Random number in range from 5 to 10
			const getType = (index: number): SnackbarType => {
				switch (index % 5) {
					case 0:
						return "default";
					case 1:
						return "success";
					case 2:
						return "info";
					case 3:
						return "warning";
					case 4:
						return "error";
					default:
						return "default";
				}
			};

			return Array.from(new Array(amount)).map((_, i) => ({
				type: getType(i),
				message: Math.random().toString(16).slice(2),
				key: Date.now() + i * 1000,
			}));
		};

		it("Should change opened flag to true, and hidden flag to false, when opening snackbar", () => {
			const state: ISnackbarProviderState = {
				isHidden: true,
				isOpened: false,
				messageQueue: generateRandomMessages(),
			};
			const action = { type: "OPEN_SNACKBAR" };
			const actual = snackbarReducer(state, action);
			const expected = {
				isHidden: false,
				isOpened: true,
				messageQueue: state.messageQueue,
			};

			expect(actual).toEqual(expected);
		});

		it("Should put a new message in the end of the current message queue", () => {
			const state: ISnackbarProviderState = {
				isHidden: false,
				isOpened: true,
				messageQueue: generateRandomMessages(),
			};
			const testMessage: ISnackbarMessage = {
				type: "info",
				message: "This message should be in the end",
				key: Date.now() + 1234,
			};
			const action = { type: "ADD_MESSAGE", payload: testMessage };
			const actual = snackbarReducer(state, action);

			expect(actual.messageQueue).toHaveLength(state.messageQueue.length + 1);
			expect(actual.messageQueue[actual.messageQueue.length - 1]).toEqual(testMessage);
		});

		it("Should set opened flag to false, when closing the snackbar", () => {
			const state: ISnackbarProviderState = {
				isHidden: false,
				isOpened: true,
				messageQueue: generateRandomMessages(),
			};
			const expected: ISnackbarProviderState = {
				isHidden: false,
				isOpened: false,
				messageQueue: state.messageQueue,
			};
			const action = { type: "CLOSE_SNACKBAR" };
			const actual = snackbarReducer(state, action);

			expect(actual).toEqual(expected);
		});

		it("Should hide the message, and remove the first message in the queue, when snackbar closing animation is finished", () => {
			const state: ISnackbarProviderState = {
				isHidden: false,
				isOpened: false,
				messageQueue: generateRandomMessages(),
			};
			const removedMessage = state.messageQueue[0];
			const action = { type: "REMOVE_MESSAGE" };
			const actual = snackbarReducer(state, action);

			expect(actual.messageQueue).toHaveLength(state.messageQueue.length - 1);
			expect(actual.messageQueue).not.toContain(removedMessage);
			expect(actual.isHidden).toEqual(true);
		});
	});
});
