// +
import styled from "@mui/system/styled";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

export const SDRoot = styled(Box)(() => ({
	position: "relative",
}));

export const SDIconButton = styled(IconButton)(() => ({
	position: "absolute",
	left: "0",
	top: "0",
	zIndex: 2,
}));

export const SDWAvatar = styled(Box)(() => ({
	position: "relative",
	padding: "2px",
}));

export const SDImgAvatar = styled(Image)(() => ({
	borderRadius: "50%",
	objectFit: "cover",
}));

export const SDList = styled(List)(() => ({}));

export const SDListItem = styled(ListItem)(() => ({
	width: "100%",
	cursor: "pointer",
}));

export const SDListItemIcon = styled(ListItemIcon)(() => ({
	marginRight: "15px",
}));
