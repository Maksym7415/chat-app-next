const Popover = () => ({
	MuiPopover: {
		styleOverrides: {
			root: ({theme}) => ({
				"& .MuiPopover-paper": {
					boxShadow: theme.shadows[0],
					backgroundColor: "transparent",
				},
			}),
		},
	},
});

export default Popover;
