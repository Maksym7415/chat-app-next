// +
import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const SDRoot = styled(Box)(() => ({
	width: "max-content",
	minWidth: "300px",
}));

export const SDWBtn = styled(Box)(() => ({
	marginTop: "15px",
	display: "flex",
	justifyContent: "center",
}));

export const SDButton = styled(Button)(() => ({
	width: "100%",
	maxWidth: "200px",
}));

export const SDTitle = styled(Typography)(() => ({
	textAlign: "center",
}));
