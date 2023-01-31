import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import Meta from "@/core/seo/Meta";
import { PostLoginQuery } from "@/services/auth/service";
import { PATHS } from "@/core/constants/paths";

export default function SignInClientPage() {
  // HOOKS
  const router = useRouter();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);

  // STATES
  const [errorBack, setErrorBack] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: loginSingIn || "",
    },
  });

  const { mutate, isLoading } = PostLoginQuery({
    cb: () => {
      router.push(PATHS.verification);
    },
    errorCb: (dataError) => {
      console.log(dataError, "dataError");
      dataError?.message && setErrorBack(dataError?.message);
    },
  });

  // FUNCTIONS
  const onSubmit = (data) => {
    const { login } = data;

    const optionsSendData = {
      data: {
        login,
      },
    };

    mutate(optionsSendData);

    errorBack && setErrorBack("");
  };

  return (
    <Meta title={"Sign-in"}>
      <AuthForm
        title={languages[lang].authorization.signIn}
        submitBtnTitle={languages[lang].authorization.signIn}
        configFields={config.signInFields}
        onSubmit={onSubmit}
        errorBack={errorBack}
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
