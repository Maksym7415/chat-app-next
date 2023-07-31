import { breakpoints } from "@/core/theme/breakpoints/index";

const Button = () => ({
	MuiButton: {
		variants: [
			// {
			// 	props: { variant: "black050505_contained_rounded" },
			// 	style: {
			// 		fontFamily: "Proxima Nova",
			// 		backgroundColor: "#050505",
			// 		width: "100%",
			// 		borderRadius: "40px",
			// 		padding: "7px",
			// 		fontSize: "24px",
			// 		color: "#ffffff",
			// 		fontWeight: 600,
			// 		[`@media (max-width: ${breakpoints.values.tabletPlus}px)`]:
			// 			{
			// 				fontSize: "20px",
			// 			},
			// 		":hover": {
			// 			backgroundColor: "#050505",
			// 		},
			// 	},
			// },
			{
				props: { variant: "text_link" },
				style: {
					backgroundColor: "transparent",
					width: "100%",
					padding: "7px",
					fontSize: "14px",
					color: "#000000",
					":hover": {
						backgroundColor: "transparent",
					},
				},
			},
		],
		styleOverrides: {
			root: () => ({
				padding: 0,
				textTransform: "inherit",
			}),
		},
	},
	MuiButtonBase: {
		defaultProps: {
			disableRipple: true,
		},
	},
});

export default Button;
