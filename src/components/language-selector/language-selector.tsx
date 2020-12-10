import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "react-i18next";

interface ILanguage {
	shortTitle: string;
	fullTitle: string;
}

const getLanguage = (code: string): ILanguage => {
	switch (code) {
		case "uk":
			return { fullTitle: "\u{1F1FA}\u{1F1E6} Українська", shortTitle: "\u{1F1FA}\u{1F1E6} UA" };
		case "ru":
			return { fullTitle: "\u{1F1F7}\u{1F1FA} Русский", shortTitle: "\u{1F1F7}\u{1F1FA} RU" };
		default:
			return { fullTitle: "\u{1F1EC}\u{1F1E7} English", shortTitle: "\u{1F1EC}\u{1F1E7} EN" };
	}
};

export const LanguageSelector: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
	const { i18n } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const isOpened = !!anchorEl;

	const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleLanguageSelect = useCallback(
		(event: React.MouseEvent<HTMLLIElement>) => {
			const newLanguage: string = event.currentTarget.dataset.language as string;

			i18n.changeLanguage(newLanguage);
			handleClose();
		},
		[i18n, handleClose],
	);

	return (
		<div {...props}>
			<Button variant="contained" onClick={handleOpen}>
				{getLanguage(i18n.language).shortTitle}
			</Button>
			<Menu open={isOpened} anchorEl={anchorEl} onClose={handleClose}>
				<MenuItem onClick={handleLanguageSelect} data-language="en">
					{getLanguage("en").fullTitle}
				</MenuItem>
				<MenuItem onClick={handleLanguageSelect} data-language="uk">
					{getLanguage("uk").fullTitle}
				</MenuItem>
				<MenuItem onClick={handleLanguageSelect} data-language="ru">
					{getLanguage("ru").fullTitle}
				</MenuItem>
			</Menu>
		</div>
	);
};
