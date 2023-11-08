import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";

export const SDRoot = styled(Box)(() => ({
	margin: 0,
	padding: "10px",
	minHeigth: "50vh",
	position: "relative",
	overflow: "hidden",
}));

export const SDWConversation = styled(Box)(() => ({
	display: "flex",
	marginTop: "10px",
	flexDirection: "column",
	overflow: "auto",
}));

export const SDConversation = styled(Box)(() => ({
	display: "flex",
	marginTop: "10px",
	borderRadius: "10px",
	cursor: "pointer",
	":hover": {
		backgroundColor: "#b9e6e1",
	},
}));

export const SDInfo = styled(Box)(() => ({
	marginLeft: "10px",
}));

export const SDNoUsersFound = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

export const SDName = styled(Typography)(() => ({
	fontWeight: 600,
}));

export const SDTextMessage = styled(Typography)(() => ({
	maxWidth: "90%",
}));

export const SDTextNoUsersFound = styled(Typography)(() => ({
	fontWeight: 600,
	fontSize: "24px",
}));

export const SDTextField = styled(TextField)(() => ({
	width: "100%",
}));
