import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Controller } from "react-hook-form";
import CustomButton from "@/components/buttons/customButton";
import TextInputCustom from "@/components/hookFormsComponents/textInput";

// STYLES
const classes = {
	container: "flex-center-center flex-1",
	wrapperForm: "flex-center-center flex-col w-full max-w-[300px] mt-[16px] ",
	title: "w-full text-center text-[36px] font-bold",
	text: "mt-[16px] w-full text-center text-[18px] font-bold cursor-pointer",
	errorText: "errorText mt-[10px]",
};

const AuthForm = ({
	title,
	configFields,
	optionsForm,
	errorBack,
	onSubmit,
	submitBtnTitle,
	render,
	isLoading,
}) => (
	<div className={classes.container}>
		<form
			className={classes.wrapperForm}
			onSubmit={optionsForm.handleSubmit(onSubmit)}
		>
			{title && <p className={classes.title}>{title}</p>}
			<>
				{configFields.map((el, key) => (
					<Controller
						key={el?.id || key}
						control={optionsForm.control}
						rules={el?.validate || {}}
						render={({ field: { onChange, value } }) => (
							<TextInputCustom
								onChangeText={onChange}
								value={value}
								error={optionsForm.errors[el.fieldName]}
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
			<CustomButton
				onClick={optionsForm.handleSubmit(onSubmit)}
				style={{ marginTop: 15, width: "100%", maxWidth: "200px" }}
				disabled={isLoading}
			>
				{isLoading ? (
					<CircularProgress
						size={15}
						style={{ color: "white" }}
					/>
				) : null}{" "}
				{submitBtnTitle}
			</CustomButton>
			{render?.text && render.text(classes)}
		</form>
	</div>
);

export default AuthForm;
