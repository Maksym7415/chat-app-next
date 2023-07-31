// APPROVED +
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import Link from "next/link";

export const SDRoot = styled(Box)(() => ({
	margin: "43px auto 0",
	maxWidth: "330px",
}));

// fix divider
export const SDDivider = styled(Divider)(({ theme }) => ({
	marginTop: "33px",
	color: theme.palette.customColors.text[10],
	fontFamily: "Proxima Nova",
	fontSize: "16px",
	fontWeight: 400,
}));

export const SDText = styled(Typography)(({ theme }) => ({
	color: theme.palette.customColors.text[10],
	lineHeight: 1,
}));

export const SDTitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.customColors.text[5],
	fontSize: "20px",
	fontWeight: 600,
	textAlign: "center",
}));

export const SDTextBtnGoogle = styled(Typography)(({ theme }) => ({
	color: theme.palette.customColors.text[10],
	fontSize: "20px",
	textAlign: "center",
}));

export const SDLink = styled(Link)(({ theme }) => ({
	color: theme.palette.customColors.text[8],
}));
