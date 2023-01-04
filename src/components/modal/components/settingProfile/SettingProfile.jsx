"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useStyles from "./styles";
import * as config from "./config";
import Avatars from "./components/avatars";
import TextInputCustom from "../../../hookFormsComponents/textInput";
import CustomButton from "../../../buttons/customButton";
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from "../../../../reduxToolkit/user/requests";
import { useUserStore } from "@/storeZustand/user/store";
import { useSettingStore } from "@/storeZustand/setting/store";
import shallow from "zustand/shallow";

const SettingProfile = ({ closeDrawer }) => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();
  // const { enqueueSnackbar } = useSnackbar();

  // SELECTORS

  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

  const { userInfo } = useUserStore(
    (state) => ({
      userInfo: state.userInfo,
    }),
    shallow
  );

  // STATES
  const [errorBack, setErrorBack] = useState("");

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  // FUNCTIONS
  const onSubmit = (data) => {
    const sendData = {};
    if (data.firstName !== userInfo.firstName) {
      sendData.firstName = data.firstName;
    }

    if (data.lastName !== userInfo.lastName) {
      sendData.lastName = data.lastName;
    }

    dispatch(
      putUpdateProfileRequest({
        data: sendData,
        cb: () => {
          // enqueueSnackbar("Success update info", { variant: "success" });
          dispatch(getUserProfileDataRequest({}));
        },
        errorCb: (error) => {
          // enqueueSnackbar(error.message, { variant: "error" });
        },
      })
    );

    errorBack && setErrorBack("");
  };

  // USEEFFECTS
  useEffect(() => {
    // set defaultValues form from back
    if (!getValues("firstName") && userInfo.firstName) {
      setValue("firstName", `${userInfo.firstName}`);
    }
    if (!getValues("lastName") && userInfo.lastName) {
      setValue("lastName", `${userInfo.lastName}`);
    }
  }, [userInfo]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Profile</h1>
      <Avatars />
      {config.fieldsEditName.map((el, key) => (
        <Controller
          key={key}
          control={control}
          rules={el.validate}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              onChangeText={onChange}
              value={value}
              error={errors[el.fieldName]}
              placeholder={el.placeholder}
              secureTextEntry={false}
              styles={el.styles}
            />
          )}
          name={el.fieldName}
        />
      ))}
      <div className={classes.wrapperBtn}>
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            maxWidth: "200px",
          }}
        >
          {"Submit"}
        </CustomButton>
      </div>
    </div>
  );
};

export default SettingProfile;
