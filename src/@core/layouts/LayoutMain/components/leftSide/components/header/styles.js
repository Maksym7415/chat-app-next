// APPROVED
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/system/styled";

export const SDRoot = styled(Box)(() => ({
	padding: "15px 8px",
}));

export const SDTop = styled(Box)(() => ({
	display: "flex",
	columnGap: "15px"
}));

export const SDIconButton = styled(IconButton)(() => ({
	padding: 0,
	svg: {
		width: "20px",
		height: "20px",
	},
}));
