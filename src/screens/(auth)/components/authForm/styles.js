import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

export const sx = {
	textBtnLink: {
		mt: "16px",
	},
};

export const SDSection = styled(Box)(() => ({
	display: "flex",
	height: "100vh",
}));

export const SDContainer = styled(Container)(() => ({
	display: "flex",
	alignItems: "baseline",
	justifyContent: "center",
}));

export const SDForm = styled(Box)(() => ({
	marginTop: "16px",
	display: "flex",
	flexDirection: "column",
	width: "100%",
	maxWidth: "300px",
	alignItems: "center",
}));

export const SDTitle = styled(Typography)(() => ({
	textAlign: "center",
	fontWeight: "700",
	fontSize: "36px",
}));
