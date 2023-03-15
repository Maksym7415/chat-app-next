import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import { PATHS } from "@/core/constants/paths";
import Meta from "@/core/seo/Meta";
import languages from "@/core/translations";
import { authApi } from "@/store/auth/api";
import { parseErrorResToType } from "@/store/helpers";

const SignUpClientPage = () => {
	// HOOKS
	const router = useRouter();

	// SELECTORS
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);

	// SERVICES
	const [postSingUp, { isLoading, error = {} }] =
		authApi.usePostSingUpMutation();

	// STATES
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
		<Meta title="Sign-up">
			<AuthForm
				title={languages[lang].authorization.signUp}
				submitBtnTitle={languages[lang].authorization.signUp}
				configFields={config.signUpPage}
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
						<p
							className={styles.text}
							onClick={() => router.push(PATHS.signIn)}
						>
							{languages[lang].authorization.haveAnAccount}{" "}
							{languages[lang].authorization.signIn}?
						</p>
					),
				}}
			/>
		</Meta>
	);
};

export default SignUpClientPage;
