// +
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

export const SDDialogTitle = styled(DialogTitle)(() => ({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
}));

export const SDDialogContent = styled(DialogContent)(() => ({
	width: "400px",
	heigth: "100%",
	position: "relative",
	paddong: 0,
	overflow: "visible",
}));

export const SDTitle = styled(Typography)(() => ({
	fontSize: "16px",
	display: "block",
}));

export const SDIconButton = styled(IconButton)(() => ({
	width: "30px",
	height: "30px",
}));
