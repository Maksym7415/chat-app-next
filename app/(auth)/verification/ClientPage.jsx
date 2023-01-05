"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useSettingStore } from "@/storeZustand/setting/store";
import { AuthService } from "@/services/auth/auth.service";

const VerificationClientPage = () => {
  // HOOKS
  const router = useRouter();

  // STORE
  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );
  const { loginSingIn, verificationCode } = useAuthStore(
    (state) => ({
      loginSingIn: state.loginSingIn,
      verificationCode: state.verificationCode,
    }),
    shallow
  );

  // STATES
  const [errorBack, setErrorBack] = useState("");
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

  // FUNCTIONS
  const onSubmit = (data) => {
    const sendData = {
      data: {
        verificationCode: data.verificationCode,
        login: loginSingIn,
      },
      cb: () => {
        router.push("/");
      },
      errorCb: (dataError) => {
        dataError?.message && setErrorBack(dataError?.message);
      },
    };

    // postVerificationRequest(sendData);

    AuthService.postVerification(sendData);

    errorBack && setErrorBack("");
  };

  // USEEFFECTS
  useEffect(() => {
    // set defaultValues form from back
    if (verificationCode) {
      setValue("verificationCode", `${verificationCode}`);
    }
  }, [verificationCode]);

  return (
    <AuthForm
      title={languages[lang].authorization.verification}
      submitBtnTitle={languages[lang].authorization.verification}
      configFields={config.verificationFields}
      onSubmit={onSubmit}
      errorBack={errorBack}
      optionsForm={{
        control,
        handleSubmit,
        errors,
      }}
    />
  );
};

export default VerificationClientPage;
