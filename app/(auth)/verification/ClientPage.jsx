"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import shallow from "zustand/shallow";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/config/translations";
import { postVerificationRequest } from "@/store/auth/requests";
import { useAuth } from "@/storeZustand/auth/store";

const VerificationClientPage = () => {
  // HOOKS
  const dispatch = useDispatch();
  const router = useRouter();

  const { loginSingIn, verificationCode, postVerificationRequest } = useAuth(
    (state) => ({
      loginSingIn: state.loginSingIn,
      verificationCode: state.verificationCode,
      postVerificationRequest: state.postVerificationRequest,
    }),
    shallow
  );

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  // this provided to prevent redirect in case we signing up, making automatically login and redirecting user straight to verification page
  // const { loginSingIn, verificationCode } = useSelector(
  //   ({ authSlice }) => authSlice
  // );

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

    // dispatch(postVerificationRequest(sendData));

    postVerificationRequest(sendData);

    errorBack && setErrorBack("");
  };

  // USEEFFECTS
  useEffect(() => {
    // set defaultValues form from back
    if (verificationCode) {
      setValue("verificationCode", `${verificationCode}`);
    }
  }, [verificationCode]);

  // if (!loginSingIn) {
  //   redirect("/sign-in");
  // }

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
