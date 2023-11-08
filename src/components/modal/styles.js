// +
import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export const SDRoot = styled(Box)(() => ({
	position: "absolute",
	maxWidth: "90vw",
	maxHeight: "90vh",
	overflow: "auto",
	background: "#ffffff",
	padding: "10px",
	borderRadius: "20px",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
}));

export const SDIconButton = styled(IconButton)(() => ({
	position: "absolute",
	right: "0",
	top: "0",
}));
