import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";
import GpsIcon from "@material-ui/icons/GpsFixed";
import GpsOffIcon from "@material-ui/icons/GpsOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "@components/weather/city-search.styles";
import { useTranslation } from "react-i18next";

export interface ICitySearchProps {
	value: string;
	searching: boolean;
	geolocationAvailable: boolean;
	errorMessage?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSearch: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
	onGetLocation: () => void | Promise<void>;
}

export const CitySearch: React.FC<ICitySearchProps> = (props) => {
	const classes = useStyles();
	const { t } = useTranslation(["search-input"]);

	return (
		<form onSubmit={props.onSearch}>
			<TextField
				fullWidth
				id="city-search"
				label={t("search-input:label")} //"Search city"
				placeholder={t("search-input:placeholder")} //"Enter city to search"
				error={!!props.errorMessage}
				helperText={props.errorMessage}
				value={props.value}
				onChange={props.onChange}
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Tooltip
								title={
									props.geolocationAvailable
										? (t("search-input:use-location-tooltip") as string) /*"Use current location"*/
										: (t("search-input:location-not-available") as string) /*"Geolocation is not available"*/
								}
							>
								<span>
									<IconButton
										disabled={!props.geolocationAvailable}
										aria-label={
											props.geolocationAvailable
												? t("search-input:use-location-aria-label") /*"get current location"*/
												: t("search-input:location-not-available-aria")
										}
										onClick={props.onGetLocation}
										className={classes.iconButton}
									>
										{props.geolocationAvailable ? <GpsIcon /> : <GpsOffIcon />}
									</IconButton>
								</span>
							</Tooltip>
							{props.searching ? (
								<CircularProgress className={classes.loadingIcon} size={24} />
							) : (
								<Tooltip title={t("search-input:search-tooltip") as string}>
									<span>
										<IconButton
											disabled={!props.value}
											className={classes.iconButton}
											component="button"
											type="submit"
											aria-label={t("search-input:search-aria-label")}
										>
											<SearchIcon />
										</IconButton>
									</span>
								</Tooltip>
							)}
						</InputAdornment>
					),
				}}
			/>
		</form>
	);
};
