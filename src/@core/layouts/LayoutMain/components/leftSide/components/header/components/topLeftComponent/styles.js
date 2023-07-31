// APPROVED
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/system/styled";

export const SDW = styled(Box)(() => ({
	display: "flex",
	alignItems: "center"
}));

export const SDIconButton = styled(IconButton)(() => ({
	padding: 0,
	svg: {
		width: "20px",
		height: "20px",
	},
}));
