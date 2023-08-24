const Button = () => ({
	MuiButton: {
		variants: [
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
