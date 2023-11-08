// +
import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import { Item } from "react-contexify";

export const SDItem = styled(Item)(() => ({
	"&:hover": {
		"& svg": {
			"& path": {
				stroke: "#ffffff",
			},
		},
	},
}));

export const SDWrapperIcon = styled(Box)(() => ({
	marginRight: "10px",
}));
