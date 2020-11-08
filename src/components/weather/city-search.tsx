import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "@components/weather/city-search.styles";

export interface ICitySearchProps {
	value: string;
	searching: boolean;
	errorMessage?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSearch: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export const CitySearch: React.FC<ICitySearchProps> = (props) => {
	const classes = useStyles();

	return (
		<TextField
			label="Search city"
			error={!!props.errorMessage}
			helperText={props.errorMessage}
			value={props.value}
			onChange={props.onChange}
			variant="outlined"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						{props.searching ? (
							<CircularProgress className={classes.loadingIcon} size={24} />
						) : (
							<IconButton onClick={props.onSearch}>
								<SearchIcon />
							</IconButton>
						)}
					</InputAdornment>
				),
			}}
		/>
	);
};
