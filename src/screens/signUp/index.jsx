"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import { PATHS } from "@/core/constants/paths";
import { useSettingStore } from "@/storeZustand/setting/store";
import { AuthService } from "@/services/auth/auth.service";
import { PostSingUpQuery } from "@/services/auth/service";

const SignUpClientPage = () => {
  // HOOKS
  const router = useRouter();

  // STORE
  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

  const { mutate, isLoading } = PostSingUpQuery({
    cb: () => {
      console.log("!__Cb");
      router.push("verification");
    },
    errorCb: (dataError) => {
      console.log("!__errorCb");
      dataError?.message && setErrorBack(dataError?.message);
    },
  });

  // STATES
  const [errorBack, setErrorBack] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // FUNCTIONS
  const onSubmit = (data) => {
    // AuthService.postSing({
    //   data: {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     login: data.email,
    //   },
    //   cb: () => {
    //     history.push(PATHS.verification);
    //   },
    //   errorCb: (dataError) => {
    //     dataError?.message && setErrorBack(dataError?.message);
    //   },
    // });

    mutate({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        login: data.email,
      },
    });

    errorBack && setErrorBack("");
  };

  return (
    <AuthForm
      title={languages[lang].authorization.signUp}
      submitBtnTitle={languages[lang].authorization.signUp}
      configFields={config.signUpPage}
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
          <p className={styles.text} onClick={() => router.push("sign-in")}>
            {languages[lang].authorization.haveAnAccount}{" "}
            {languages[lang].authorization.signIn}?
          </p>
        ),
      }}
    />
  );
};

export default SignUpClientPage;
