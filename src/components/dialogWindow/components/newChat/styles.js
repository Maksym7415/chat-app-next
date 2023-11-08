// +
import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const SDRoot = styled(Box)(() => ({
	margin: 0,
	padding: "10px 20px",
	height: "100%",
	display: "flex",
	flexDirection: "column",
}));

export const SDWContact = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	padding: "10px 5px",
	borderRadius: "20px",
	cursor: "pointer",
}));

export const SDWInfo = styled(Box)(() => ({
	paddingLeft: 20,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
}));

export const SDFullName = styled(Typography)(() => ({
	fontSize: "16px",
	margin: 0,
}));

export const SDLogin = styled(Typography)(() => ({
	margin: 0,
	marginTop: "3px",
	fontSize: "12px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
}));

export const SDButton = styled(Button)(() => ({
	margin: "10px auto 0",
	width: "100%",
	maxWidth: "200px",
}));
