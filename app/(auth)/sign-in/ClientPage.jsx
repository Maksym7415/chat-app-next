"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/config/translations";
import { postLoginRequest } from "@/store/auth/requests";
import { useAuth } from "@/storeZustand/auth/store";

export default function SignInPage() {
  // HOOKS
  const dispatch = useDispatch();
  const router = useRouter();

  const { loginSingIn, postLoginRequest } = useAuth(
    (state) => ({
      loginSingIn: state.loginSingIn,
      postLoginRequest: state.postLoginRequest,
    }),
    shallow
  );

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  // const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);

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

    // dispatch(postLoginRequest(sendData));

    postLoginRequest(sendData);

    errorBack && setErrorBack("");
  };

  return (
    <>
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
      {/* <button
        onClick={() => {
          // setCookie(null, "token", "111___111");
          // nookies.set(null, "token", "complex", {});
          Cookies.set("token", "complex");
        }}
      >
        setCookie
      </button>
      <button
        onClick={() => {
          // const token = nookies.get(null, "token");
          // console.log(token, "token");
          console.log(Cookies.get("token"), "token");
        }}
      >
        getCookie
      </button> */}
    </>
  );
}
