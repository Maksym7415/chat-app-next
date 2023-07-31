import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import { fetchQuery } from "@/helpers/index";
import { pathBackUser } from "@/constants/urlBack";
import { PATHS } from "@/constants/paths";
import Meta from "@/core/seo/Meta";
import languages from "@/core/translations";
import { authApi } from "@/store/auth/api";
import { parseErrorResToType } from "@/store/helpers";
import { allActionsStore } from "@/store/rootActions";
import toast from "@/helpers/toastify";

export const VerificationScreen = () => {
	// HOOKS
	const router = useRouter();
	const dispatch = useDispatch();

	// SELECTORS
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);
	const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);
	const verificationCode = useSelector(
		({ authSlice }) => authSlice.verificationCode,
	);
	const callbackUrl = decodeURI(router.query?.callbackUrl ?? PATHS.main);

	// STATES
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
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
			setValue("verificationCode", `${verificationCode}`);
		}
	}, [verificationCode]);

	return (
		<Meta title="Verification">
			<AuthForm
				title={languages[lang].authorization.verification}
				submitBtnTitle={languages[lang].authorization.verification}
				configFields={config.verificationFields}
				isLoading={isLoading}
				onSubmit={onSubmit}
				errorBack={parseErrorResToType({ error })}
				optionsForm={{
					control,
					handleSubmit,
					errors,
				}}
			/>
		</Meta>
	);
};
