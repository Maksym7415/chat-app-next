const Chip = () => ({
	MuiChip: {
		styleOverrides: {
			root: ({ theme }) => ({
				height: "26px",
				fontFamily: "Proxima Nova",
				fontWeight: 600,
				fontSize: "14px",
				backgroundColor: "red",
				borderRadius: "20px",
				"&:hover": {
					backgroundColor: "red",
				},

				"&.MuiChip-rounded": {},
				"&.MuiChip-clickable:hover": {
					backgroundColor: theme.palette.customColors.bg[1],
				},
			}),
			deleteIcon: {},
			colorPrimary: ({ theme }) => ({
				borderColor: theme.palette.customColors.bg[1],
				color: theme.palette.customColors.bg[1],
			}),
		},
	},
});

export default Chip;
