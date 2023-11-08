import Box from "@mui/material/Box";
import styled from "@mui/system/styled";
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
