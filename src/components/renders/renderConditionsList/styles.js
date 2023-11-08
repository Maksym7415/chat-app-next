// +
import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const SDBoxCenter = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "justify-center",
	height: "100%",
}));

export const SDTextNoResults = styled(Typography)(() => ({
	fontWeight: 700,
	fontSize: "20px",
}));
