import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import * as config from "./config";
import AuthForm from "@/components/authForm";
import languages from "@/core/translations";
import Meta from "@/core/seo/Meta";
import { PATHS } from "@/core/constants/paths";
import { PostSingUpQuery } from "@/services/auth/service";

const SignUpClientPage = () => {
  // HOOKS
  const router = useRouter();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);

  const { mutate, isLoading } = PostSingUpQuery({
    cb: () => {
      router.push(PATHS.verification);
    },
    errorCb: (dataError) => {
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
    <Meta title={"Sign-up"}>
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
