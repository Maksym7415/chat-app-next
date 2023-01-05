"use client";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function BaseSelect({ selectSetting }) {
  return (
    <FormControl style={{ width: "100%" }} variant="outlined">
      <InputLabel>{selectSetting.label}</InputLabel>
      <Select
        value={selectSetting.selected}
        label="Age"
        onChange={selectSetting.handleChange}
      >
        {selectSetting.options.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
