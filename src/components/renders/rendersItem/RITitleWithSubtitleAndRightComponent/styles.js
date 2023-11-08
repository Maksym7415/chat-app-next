import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const SDWrapperItem = styled(Box)(() => ({
	display: "flex",
	alignItems: "center",
	pointerEvents: "none",
	padding: "12px 10px",
}));

export const SDWrapperItemLeft = styled(Box)(() => ({}));

export const SDTitle = styled(Typography)(() => ({
	fontSize: "15px",
	color: "#202020",
	margin: 0,
}));

export const SDSubTitle = styled(Typography)(() => ({
	fontSize: "12px",
	color: "#83868B",
	marginTop: "6px",
}));
