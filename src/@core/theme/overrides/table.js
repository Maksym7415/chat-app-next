// APPROVED

const Table = () => ({
	MuiTableContainer: {},
	MuiTableHead: ({ theme }) => ({
		styleOverrides: {
			root: {
				border: `1px solid ${theme.palette.customColors.border[3]}`,
				"& .MuiTableRow-head": {
					border: "none",
				},
				"& .MuiTableCell-head": {
					color: theme.palette.customColors.text[21],
					fontFamily: "Proxima Nova",
					fontSize: "16px",
					fontWeight: 600,
					lineHeight: "1rem",
					textAlign: "left",
					backgroundColor:theme.palette.customColors.bg[12],
					border: "none",
				},
			},
		},
	}),
	MuiTableBody: {
		styleOverrides: {
			root: ({ theme }) => ({
				"& .MuiTableRow-root": {
					backgroundColor:theme.palette.customColors.bg[6],
					":nth-of-type(odd)": {
						backgroundColor: theme.palette.customColors.bg[16],
					},
				},
			}),
		},
	},
	MuiTableRow: {},
	MuiTableCell: {
		styleOverrides: {
			root: ({ theme }) => ({
				color: theme.palette.customColors.text[21],
				fontFamily: "Proxima Nova",
				fontSize: "16px",
				fontWeight: 400,
				lineHeight: "1rem",
				textAlign: "left",
				padding: "13px 25px 11px 0",
				borderBottom: "none",
				":first-of-type": {
					paddingLeft: "19px",
				},
				":last-of-type": {
					paddingRight: "28px",
				},
			}),
		},
	},
});

export default Table;
