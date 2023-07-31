import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { sx } from "./styles";
import * as config from "./config";
import AuthForm from "@/screens/(auth)/components/authForm";
import { PATHS } from "@/constants/paths";
import Meta from "@/core/seo/Meta";
import { authApi } from "@/store/auth/api";
import { parseErrorResToType } from "@/store/helpers";

export const SignInScreen = () => {
	// HOOKS
	const router = useRouter();
	const { t } = useTranslation("common");

	// SELECTORS
	const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);

	// STATES
	const methodsForm = useForm({
		resolver: zodResolver(config.validationSchema),
		defaultValues: {
			login: loginSingIn || "",
		},
	});

	// API
	const [postLogin, { isLoading, error = {} }] =
		authApi.usePostLoginMutation();

	// FUNCTIONS
	const onSubmit = (data) => {
		const { login } = data;

		const sendData = {
			login,
		};

		postLogin(sendData)
			.unwrap()
			.then(() => {
				router.push(PATHS.verification);
			});
	};

	return (
		<Meta title="authorization.signIn">
			<FormProvider {...methodsForm}>
				<AuthForm
					title={t("authorization.signIn")}
					submitBtnTitle={t("authorization.signIn")}
					configFields={config.signInFields}
					onSubmit={onSubmit}
					errorBack={parseErrorResToType({ error })}
					isLoading={isLoading}
					render={{
						text: () => (
							<Button
								sx={sx.textBtnLink}
								component={Link}
								href={PATHS.signUp}
								variant="text_link"
							>
								{`${t("authorization.haveNoAccount")} ${t(
									"authorization.signUp",
								)}? `}
							</Button>
						),
					}}
				/>
			</FormProvider>
		</Meta>
	);
};
