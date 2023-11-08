import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function BaseSelect({ selectSetting }) {
	return (
		<FormControl
			sx={{ width: "100%" }}
			variant="outlined"
		>
			<InputLabel>{selectSetting.label}</InputLabel>
			<Select
				value={selectSetting.selected}
				label="Age"
				onChange={selectSetting.handleChange}
			>
				{selectSetting.options.map((item) => (
					<MenuItem
						value={item.value}
						key={item.value}
					>
						{item.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
