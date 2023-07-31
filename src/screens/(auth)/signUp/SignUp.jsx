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

export const SignUpScreen = () => {
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
	const [postSingUp, { isLoading, error = {} }] =
		authApi.usePostSingUpMutation();

	// FUNCTIONS
	const onSubmit = (data) => {
		const sendData = {
			firstName: data.firstName,
			lastName: data.lastName,
			login: data.email,
		};

		postSingUp(sendData)
			.unwrap()
			.then(() => {
				router.push(PATHS.verification);
			});
	};

	return (
		<Meta title="authorization.signUp">
			<FormProvider {...methodsForm}>
				<AuthForm
					title={t("authorization.signUp")}
					submitBtnTitle={t("authorization.signUp")}
					configFields={config.signUpPage}
					onSubmit={onSubmit}
					errorBack={parseErrorResToType({ error })}
					isLoading={isLoading}
					render={{
						text: () => (
							<Button
								sx={sx.textBtnLink}
								component={Link}
								href={PATHS.signIn}
								variant="text_link"
							>
								{`${t("authorization.haveAnAccount")} ${t(
									"authorization.signIn",
								)}? `}
							</Button>
						),
					}}
				/>
			</FormProvider>
		</Meta>
	);
};
