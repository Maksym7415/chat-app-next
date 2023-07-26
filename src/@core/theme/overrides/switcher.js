const Switcher = () => ({
	MuiSwitch: {
		styleOverrides: {
			root: ({ theme }) => ({
				width: "51px",
				height: "19px",
				borderRadius: theme.varietyBorderRadius[5],
				backgroundColor: theme.palette.customColors.bg[3],
				padding: 0,
			}),
			switchBase: ({ theme }) => ({
				padding: 0,
				"&.Mui-checked": {
					transform: "translateX(calc(51px - 19px))",
					color: "#fff",
					"& + .MuiSwitch-track": {
						backgroundColor: theme.palette.customColors.bg[1],
						opacity: 1,
						border: 0,
					},
					"&.Mui-disabled + .MuiSwitch-track": {
						opacity: 0.5,
					},
				},
			}),
			thumb: {
				width: "19px",
				height: "19px",
			},
			track: ({ theme }) => ({
				opacity: 1,
				backgroundColor: theme.palette.customColors.bg[3],
			}),
		},
	},
});

export default Switcher;
