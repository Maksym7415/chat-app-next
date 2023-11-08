"use client";

import { useTranslation } from "next-i18next";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SDRoot, SDWBtn, SDButton, SDTitle } from "./styles";
import Avatars from "./components/avatars";
import * as config from "./config";
import TextInputCustom from "@/components/hookFormsComponents/textInput";
import { userApi } from "@/store/user/api";

const SettingProfile = () => {
	// HOOKS
	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation("common");

	// SELECTORS
	const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

	// STATES
	const {
		control,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
		},
	});

	const [putUpdateProfileData, { isLoading }] =
		userApi.usePutUpdateProfileDataMutation();

	// FUNCTIONS
	const onSubmit = (data) => {
		const sendData = {};
		if (data.firstName !== userInfo.firstName) {
			sendData.firstName = data.firstName;
		}

		if (data.lastName !== userInfo.lastName) {
			sendData.lastName = data.lastName;
		}

		Object.keys(sendData).length
			? putUpdateProfileData(sendData)
					.unwrap()
					.then(() => {
						enqueueSnackbar("Success change language", {
							variant: "success",
						});
					})
					.catch((err) => {
						console.log(err, "err");
						enqueueSnackbar(err.message, { variant: "error" });
					})
			: enqueueSnackbar("Немає змін щоб оновити дані", {
					variant: "info",
			  });
	};

	// USEEFFECTS
	useEffect(() => {
		// set defaultValues form from back
		if (!getValues(config.fieldsKeysData.firstName.key) && userInfo.firstName) {
			setValue(
				config.fieldsKeysData.firstName.key,
				`${userInfo.firstName}`,
			);
		}
		if (!getValues(config.fieldsKeysData.lastName.key) && userInfo.lastName) {
			setValue(
				config.fieldsKeysData.lastName.key,
				`${userInfo.lastName}`,
			);
		}
	}, [userInfo]);

	return (
		<SDRoot>
			<SDTitle>{t("generals.search")}</SDTitle>
			<Avatars />
			<form>
				{config.fields.map((el) => (
					<Controller
						key={el.id}
						control={control}
						rules={el.validate}
						render={({ field: { onChange, value } }) => (
							<TextInputCustom
								onChangeText={onChange}
								value={value}
								error={errors[el.fieldName]}
								placeholder={el.placeholder}
								secureTextEntry={false}
								optionsTagsSx={el.optionsTagsSx}
							/>
						)}
						name={el.fieldName}
					/>
				))}
				<SDWBtn>
					<SDButton
						onClick={handleSubmit(onSubmit)}
						disabled={isLoading}
					>
						Submit
					</SDButton>
				</SDWBtn>
			</form>
		</SDRoot>
	);
};

export default SettingProfile;
