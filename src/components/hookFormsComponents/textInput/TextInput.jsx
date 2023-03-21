import { TextField } from "@mui/material";
import clsx from "clsx";

// STYLES
const classes = {
	container: " w-full",
	textViewError: "border-w-[1px] rounded-[4px] mt-[8]",
	label: "pb-[6px] text-black text-[24px] font-medium",
	errorLabel: "errorText text-center pt-[2px]",
	inputStyle: " w-full text-[20px] text-black bg-transparent",
	errorInputStyle: "text-[24px] text-black",
};

const TextInputField = ({
	onChangeText,
	error,
	label,
	value,
	styles,
	placeholder,
	textInputProps = {},
}) => (
	<div
		className={classes.container}
		style={styles?.container}
	>
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

export default TextInputField;
