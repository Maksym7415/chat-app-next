// +
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

export const SDRoot = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#48b7db",
	flexShrink: 0,
}));

export const SDText = styled(Typography)(() => ({
	fontWeight: 700,
	color: "#ffffff",
}));
