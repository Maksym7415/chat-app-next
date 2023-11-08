import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const SDRoot = styled(Box)(() => ({
	width: "100%",
}));

export const SDLabel = styled(Typography)(() => ({
	paddingBottom: "6px",
	color: "#000000",
	fontWeight: "bold",
	fontSize: "24px",
}));

export const SDTextError = styled(Typography)(() => ({
	paddingTop: "2px",
}));

export const SDTextField = styled(TextField)(() => ({
	width: "100%",
	fontSize: "22px",
	color: "#000000",
	background: "transparent",
}));
