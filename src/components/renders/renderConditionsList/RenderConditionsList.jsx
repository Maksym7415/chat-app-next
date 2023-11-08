import { CircularProgress } from "@mui/material";
import { SDBoxCenter, SDTextNoResults } from "./styles";


const RenderConditionsList = ({
	list = [],
	isLoading = false,
	isError = false,
	errorMessage = "error",
	noResultsText = "No results",
	optionsTagsSx = {
		boxCenter: {},
		noResults: {},
	},
}) => {
	// RENDER CONDITIONS
	if (isError) {
		return (
			<SDBoxCenter sx={optionsTagsSx?.boxCenter}>
				{errorMessage}
			</SDBoxCenter>
		);
	}

	if (isLoading) {
		return (
				<SDBoxCenter sx={optionsTagsSx?.boxCenter}>
				<CircularProgress size={50} />
			</SDBoxCenter>
		);
	}

	if (!list.length) {
		return (
			<SDBoxCenter sx={optionsTagsSx?.boxCenter}>
				<SDTextNoResults sx={optionsTagsSx?.noResults}>
					{noResultsText}
				</SDTextNoResults>
			</SDBoxCenter>
		);
	}

	return null;
};

export default RenderConditionsList;
