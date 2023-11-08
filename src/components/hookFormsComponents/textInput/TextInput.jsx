import { SDRoot, SDLabel, SDTextError, SDTextField } from "./styles";

const TextInputField = ({
	onChangeText,
	error,
	label,
	value,
	placeholder,
	textInputProps = {},
	optionsTagsSx = {
		root: {},
		label: {},
	},
}) => (
	<SDRoot sx={optionsTagsSx?.root}>
		{label && <SDLabel sx={optionsTagsSx?.label}>{label}</SDLabel>}
		<SDTextField
			// className={clsx(classes.inputStyle, {
			// 	[classes.errorInputStyle]: error,
			// })}
			onChange={onChangeText}
			value={value}
			placeholder={placeholder}
			{...textInputProps}
		/>
		{error && (
			<SDTextError className="errorText">{error.message}</SDTextError>
		)}
	</SDRoot>
);

export default TextInputField;
