import React from "react";
import { TextField } from "@mui/material";
import clsx from "clsx";
import useStyles from "./styles";

// need ts

const TextInputField = ({
  onChangeText,
  error,
  secureTextEntry,
  label,
  keyboardType,
  value,
  styles,
  placeholder,
  settingAuto = {
    autoCapitalize: "auto",
    autoComplete: false,
    autoCorrect: false,
  },
  textInputProps = {},
}: any) => {
  // HOOKS
  const classes = useStyles();

  return (
    <div className={classes.container} style={styles.container}>
      {label && <p style={styles.label}>{label}</p>}
      <TextField
        className={clsx(classes.inputStyle, {
          [classes.errorInputStyle]: error,
        })}
        onChange={onChangeText}
        value={value}
        placeholder={placeholder}
        {...textInputProps}
      />
      {error && <p className={classes.errorLabel}>{error.message}</p>}
    </div>
  );
};

export default TextInputField;
