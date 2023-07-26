const input = () => ({
	MuiOutlinedInput: {
		styleOverrides: {
			notchedOutline: {
				border: "none",
				zIndex: 2,
			},
		},
	},
	MuiInputBase: {
		styleOverrides: {
			root: ({ theme }) => ({
				"&::before, &::after": {
					display: "none",
				},
				borderRadius: theme.varietyBorderRadius[4],
				border: `1px solid ${theme.palette.customColors.border[3]}`,
				backgroundColor: theme.palette.customColors.bg[6],
				marginLeft: 0,
				width: "100%",
				svg: {
					fill: theme.palette.customColors.svg[1],
				},
			}),
			input: ({ theme }) => ({
				color: theme.palette.customColors.text[10],
				fontFamily: "Proxima Nova",
				fontSize: "20px",
				fontWeight: 400,
				textAlign: "left",
				padding: "7px 15px 5px",
				height: "auto",
			}),
		},
	},
});

export default input;
