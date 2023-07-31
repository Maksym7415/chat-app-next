import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import { PATHS } from "@/constants/paths";
import Meta from "@/core/seo/Meta";
import languages from "@/core/translations";
import { authApi } from "@/store/auth/api";
import { parseErrorResToType } from "@/store/helpers";

export default function SignInClientPage() {
	// HOOKS
	const router = useRouter();

	// SELECTORS
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);
	const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);

	// STATES
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: loginSingIn || "",
		},
	});

	// SERVICES
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
		<Meta title="Sign-in">
			<AuthForm
				title={languages[lang].authorization.signIn}
				submitBtnTitle={languages[lang].authorization.signIn}
				configFields={config.signInFields}
				onSubmit={onSubmit}
				errorBack={parseErrorResToType({ error })}
				isLoading={isLoading}
				optionsForm={{
					control,
					handleSubmit,
					errors,
				}}
				render={{
					text: (styles) => (
						<button
							type="button"
							className={styles.text}
							onClick={() => router.push(PATHS.signUp)}
						>
							{languages[lang].authorization.haveNoAccount}{" "}
							{languages[lang].authorization.signUp} ?
						</button>
					),
				}}
			/>
		</Meta>
	);
}
