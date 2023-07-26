const typography = {
	MuiTypography: {
		styleOverrides: {
			root: ({ theme }) => ({
				color: theme.palette.customColors.text[1],
				fontFamily: "Proxima Nova",
				fontWeight: 400,
				textAlign: "left",
				fontSize: "14px",
			}),
		},
	},
};

export default typography;
