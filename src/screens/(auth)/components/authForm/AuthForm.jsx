import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";
import { SDSection, SDContainer, SDForm, SDTitle } from "./styles";
import TextInputCustom from "@/components/hookFormsComponents/textInput";

// STYLES
const classes = {
	errorText: "errorText mt-[10px]",
};

const AuthForm = ({
	title,
	configFields,
	errorBack,
	onSubmit,
	submitBtnTitle,
	render,
	isLoading,
}) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useFormContext();

	return (
		<SDSection component="section">
			<SDContainer>
				<SDForm
					component="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					{title && <SDTitle>{title}</SDTitle>}
					<>
						{configFields?.map((el, key) => (
							<Controller
								key={el?.id || key}
								control={control}
								rules={el?.validate || {}}
								render={({ field: { onChange, value } }) => (
									<TextInputCustom
										onChangeText={onChange}
										value={value}
										error={errors[el.fieldName]}
										placeholder={el.placeholder}
										secureTextEntry={false}
										styles={el.styles}
									/>
								)}
								name={el.fieldName}
							/>
						))}
					</>
					{errorBack && (
						<div className={classes.error}>
							<p className={classes.errorText}>{errorBack}</p>
						</div>
					)}
					<Button
						onClick={handleSubmit(onSubmit)}
						style={{
							marginTop: 15,
							width: "100%",
							maxWidth: "200px",
						}}
						disabled={isLoading}
					>
						{isLoading ? (
							<CircularProgress
								size={15}
								style={{ color: "white" }}
							/>
						) : null}{" "}
						{submitBtnTitle}
					</Button>
					{render?.text && render.text(classes)}
				</SDForm>
			</SDContainer>
		</SDSection>
	);
};

export default AuthForm;
