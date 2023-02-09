import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import Meta from "@/core/seo/Meta";
import { PATHS } from "@/core/constants/paths";
import { authApi } from "@/services/auth/serviceRedux";
import { parseErrorResToType } from "@/services/helpers";

const VerificationClientPage = () => {
  // HOOKS
  const router = useRouter();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const loginSingIn = useSelector(({ authSlice }) => authSlice.loginSingIn);
  const verificationCode = useSelector(
    ({ authSlice }) => authSlice.verificationCode
  );

  // STATES
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

  // SERVICES
  const [postVerification, { isLoading, error = {} }] =
    authApi.usePostVerificationMutation();

  // FUNCTIONS
  const onSubmit = (data) => {
    const sendData = {
      verificationCode: data.verificationCode,
      login: loginSingIn,
    };

    postVerification(sendData)
      .unwrap()
      .then(() => {
        router.push(PATHS.main);
      });
  };

  // USEEFFECTS
  useEffect(() => {
    // set defaultValues form from back
    if (verificationCode) {
      setValue("verificationCode", `${verificationCode}`);
    }
  }, [verificationCode]);

  return (
    <Meta title={"Verification"}>
      <AuthForm
        title={languages[lang].authorization.verification}
        submitBtnTitle={languages[lang].authorization.verification}
        configFields={config.verificationFields}
        isLoading={isLoading}
        onSubmit={onSubmit}
        errorBack={parseErrorResToType({ error })}
        optionsForm={{
          control,
          handleSubmit,
          errors,
        }}
      />
    </Meta>
  );
};

export default VerificationClientPage;
