import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import useStyles from "./styles";
import * as config from "./config";
import Avatars from "./components/avatars";
import TextInputCustom from "../../../hookFormsComponents/textInput";
import CustomButton from "../../../buttons/customButton";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from "../../../../reduxToolkit/user/requests";

// need ts

const SettingProfile = ({ closeDrawer }: any) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const { userInfo } = useAppSelector(({ userSlice }) => userSlice);

  // STATES
  const [errorBack, setErrorBack] = React.useState("");

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
  });

  // FUNCTIONS
  const onSubmit = (data) => {
    const sendData: any = {};
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
          enqueueSnackbar("Success update info", { variant: "success" });
          dispatch(getUserProfileDataRequest({}));
        },
        errorCb: (error) => {
          enqueueSnackbar(error.message, { variant: "error" });
        },
      })
    );

    errorBack && setErrorBack("");
  };

  // USEEFFECTS
  React.useEffect(() => {
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
