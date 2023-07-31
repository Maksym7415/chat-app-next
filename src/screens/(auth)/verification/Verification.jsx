import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/screens/(auth)/components/authForm";
import { fetchQuery } from "@/helpers/index";
import { pathBackUser } from "@/constants/urlBack";
import { PATHS } from "@/constants/paths";
import Meta from "@/core/seo/Meta";
import { authApi } from "@/store/auth/api";
import { parseErrorResToType } from "@/store/helpers";
import { allActionsStore } from "@/store/rootActions";
import toast from "@/helpers/toastify";

export const VerificationScreen = () => {
	// HOOKS
	const router = useRouter();
	const dispatch = useDispatch();
	const { t } = useTranslation("common");

	// SELECTORS
	const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);
	const verificationCode = useSelector(
		({ authSlice }) => authSlice.verificationCode,
	);
	const callbackUrl = decodeURI(router.query?.callbackUrl ?? PATHS.main);

	// STATES
	const methodsForm = useForm({
		resolver: zodResolver(config.validationSchema),
		defaultValues: {
			verificationCode: "",
		},
	});

	// SERVICES
	const [postVerification, { isLoading, error = {} }] =
		authApi.usePostVerificationMutation();

	// FUNCTIONS
	const onSubmit = (data) => {
		const sendData = {
			verificationCode: data.verificationCode,
			login: loginSingIn,
		};

		postVerification(sendData)
			.unwrap()
			.then(async ({ accessToken, refreshToken }) => {
				const token = accessToken;
				dispatch(allActionsStore.setLoginSingInAction(loginSingIn));

				const resUserMe = await fetchQuery({
					url: pathBackUser.getUserProfileData,
					token,
				});

				if (resUserMe.response.ok) {
					const setCredentials = async (dataUser) => {
						const userData = {
							...dataUser,
							refreshToken,
							token,
						};

						const resCredentials = await signIn("credentials", {
							user: JSON.stringify(userData),
							redirect: false,
							accessToken,
						});

						if (resCredentials.ok) {
							dispatch(
								allActionsStore.setUserInfoAction(
									userData || {},
								),
							);

							router.push(callbackUrl);
						} else {
							toast.warning("warning");
						}
					};

					setCredentials(resUserMe.data);
				}
			});
	};

	// USEEFFECTS
	useEffect(() => {
		// set defaultValues form from back
		if (verificationCode) {
			methodsForm.setValue("verificationCode", `${verificationCode}`);
		}
	}, [verificationCode]);

	return (
		<Meta title="verification">
			<FormProvider {...methodsForm}>
				<AuthForm
					title={t("authorization.verification")}
					submitBtnTitle={t("authorization.verification")}
					configFields={config.verificationFields}
					isLoading={isLoading}
					onSubmit={onSubmit}
					errorBack={parseErrorResToType({ error })}
				/>
			</FormProvider>
		</Meta>
	);
};
