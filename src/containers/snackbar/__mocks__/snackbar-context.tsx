import React, { createContext } from "react";
import { ISnackbarContext, SnackbarType } from "@containers/snackbar";

export const _showMock = jest.fn<void, [message: string, type?: SnackbarType]>();
export const _successMock = jest.fn<void, [message: string]>();
export const _infoMock = jest.fn<void, [message: string]>();
export const _warningMock = jest.fn<void, [message: string]>();
export const _errorMock = jest.fn<void, [message: string]>();

export const _resetHistory = (): void => {
	_showMock.mockClear();
	_successMock.mockClear();
	_infoMock.mockClear();
	_warningMock.mockClear();
	_errorMock.mockClear();
};

const defaultValue = {
	snackbar: {
		show: _showMock,
		success: _successMock,
		info: _infoMock,
		warning: _warningMock,
		error: _errorMock,
	},
};

export const SnackbarContext = createContext<ISnackbarContext>(defaultValue);

export const SnackbarProvider: React.FC = (props) => (
	<SnackbarContext.Provider value={defaultValue}>{props.children}</SnackbarContext.Provider>
);
