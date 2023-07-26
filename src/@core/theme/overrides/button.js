import { breakpoints } from "@/core/theme/breakpoints/index";

const Button = () => ({
	MuiButton: {
		variants: [
			{
				props: { variant: "black050505_contained_rounded" },
				style: {
					fontFamily: "Proxima Nova",
					backgroundColor: "#050505",
					width: "100%",
					borderRadius: "40px",
					padding: "7px",
					fontSize: "24px",
					color: "#ffffff",
					fontWeight: 600,
					[`@media (max-width: ${breakpoints.values.tabletPlus}px)`]:
						{
							fontSize: "20px",
						},
					":hover": {
						backgroundColor: "#050505",
					},
				},
			},
			{
				props: { variant: "black050505_outlined_rounded" },
				style: () => ({
					backgroundColor: "#ffffff",
					border: "4px solid #050505",
					width: "100%",
					borderRadius: "40px",
					padding: "7px",
					fontSize: "24px",
					fontFamily: "Proxima Nova",
					color: "#050505 ",
					fontWeight: 600,
					[`@media (max-width: ${breakpoints.values.tabletPlus}px)`]:
						{
							border: "2px solid #050505",
							fontSize: "20px",
						},

					":hover": {
						border: "4px solid #050505",
						backgroundColor: "#ffffff",
					},
				}),
			},
			{
				props: { variant: "blackffffff_outlined_rounded" },
				style: () => ({
					fontFamily: "Proxima Nova",
					backgroundColor: "#050505",
					border: "4px solid #ffffff",
					width: "100%",
					borderRadius: "40px",
					padding: "7px",
					fontSize: "24px",
					color: "#ffffff ",
					fontWeight: 600,
					[`@media (max-width: ${breakpoints.values.tabletPlus}px)`]:
						{
							border: "2px solid #ffffff",
							fontSize: "20px",
						},

					":hover": {
						border: "4px solid #ffffff",
						backgroundColor: "#050505",
					},
				}),
			},
			{
				props: { variant: "blackffffff_contained_rounded" },
				style: {
					fontFamily: "Proxima Nova",
					backgroundColor: "#ffffff",
					width: "100%",
					borderRadius: "40px",
					padding: "7px",
					fontSize: "24px",
					color: "#050505",
					fontWeight: 600,
					[`@media (max-width: ${breakpoints.values.tabletPlus}px)`]:
						{
							fontSize: "20px",
						},
					":hover": {
						backgroundColor: "#ffffff",
					},
				},
			},
		],
		styleOverrides: {
			root: () => ({
				padding: 0,
				textTransform: "inherit",
				fontFamily: "Proxima Nova",
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
