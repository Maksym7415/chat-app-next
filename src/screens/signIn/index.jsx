import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import Meta from "@/core/seo/Meta";
import { PATHS } from "@/core/constants/paths";
import { authApi } from "@/store/auth/api";
import { parseErrorResToType } from "@/store/helpers";
import { useSession, getSession } from "next-auth/react";

export default function SignInClientPage() {
  // HOOKS
  const router = useRouter();

  // remove
  const { data: sessiond } = useSession();
  console.log(sessiond, "session");
  getSession().then((res) => {
    console.log(res, "getSession");
  });

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
  const [postLogin, { isLoading, error = {} }] = authApi.usePostLoginMutation();

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
    <Meta title={"Sign-in"}>
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
            <p
              className={styles.text}
              onClick={() => router.push(PATHS.signUp)}
            >
              {languages[lang].authorization.haveNoAccount}{" "}
              {languages[lang].authorization.signUp} ?
            </p>
          ),
        }}
      />
    </Meta>
  );
}
