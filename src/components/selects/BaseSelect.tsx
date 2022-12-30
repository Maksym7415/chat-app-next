import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface IBaseSelectProps {
  selectSetting: {
    label: string;
    selected: string;
    options: any[];
    handleChange: (event: any) => void;
  };
}

export default function BaseSelect({ selectSetting }: IBaseSelectProps) {
  return (
    <FormControl style={{ width: "100%" }} variant="outlined">
      <InputLabel>{selectSetting.label}</InputLabel>
      <Select
        value={selectSetting.selected}
        label="Age"
        onChange={selectSetting.handleChange}
      >
        {selectSetting.options.map((item: any) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
