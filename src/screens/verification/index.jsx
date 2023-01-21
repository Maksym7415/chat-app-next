import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import Meta from "@/core/seo/Meta";
import { PATHS } from "@/core/constants/paths";
import { PostVerificationQuery } from "@/services/auth/service";

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

  const { mutate, isLoading } = PostVerificationQuery({
    cb: () => {
      router.push(PATHS.main);
    },
    errorCb: (dataError) => {
      dataError?.message && setErrorBack(dataError?.message);
    },
  });

  // FUNCTIONS
  const onSubmit = (data) => {
    const optionsSendData = {
      data: {
        verificationCode: data.verificationCode,
        login: loginSingIn,
      },
    };

    mutate(optionsSendData);

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
    <Meta title={"Verification"}>
      <AuthForm
        title={languages[lang].authorization.verification}
        submitBtnTitle={languages[lang].authorization.verification}
        configFields={config.verificationFields}
        isLoading={isLoading}
        onSubmit={onSubmit}
        errorBack={errorBack}
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
