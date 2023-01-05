"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useSettingStore } from "@/storeZustand/setting/store";
import { AuthService } from "@/services/auth/auth.service";

export default function SignInClientPage() {
  // HOOKS
  const router = useRouter();

  // STORE
  const { loginSingIn } = useAuthStore(
    (state) => ({
      loginSingIn: state.loginSingIn,
    }),
    shallow
  );

  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

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

  // FUNCTIONS
  const onSubmit = (data) => {
    const { login } = data;

    const sendData = {
      data: {
        login,
      },
      cb: () => {
        router.push("verification");
      },
      errorCb: (dataError) => {
        dataError?.message && setErrorBack(dataError?.message);
      },
    };

    AuthService.postLogin(sendData);

    errorBack && setErrorBack("");
  };

  return (
    <AuthForm
      title={languages[lang].authorization.signIn}
      submitBtnTitle={languages[lang].authorization.signIn}
      configFields={config.signInFields}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
      render={{
        text: (styles) => (
          <p className={styles.text} onClick={() => router.push("sign-up")}>
            {languages[lang].authorization.haveNoAccount}{" "}
            {languages[lang].authorization.signUp} ?
          </p>
        ),
      }}
    />
  );
}
