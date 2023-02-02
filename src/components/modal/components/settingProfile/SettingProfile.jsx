import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import * as config from "./config";
import Avatars from "./components/avatars";
import TextInputCustom from "@/components/hookFormsComponents/textInput";
import CustomButton from "@/components/buttons/customButton";
import {
  PutUpdateProfileDataQuery,
  getFetchUserProfileDataQuery,
} from "@/services/user/service";

// STYLES
const classes = {
  container: "w-max w-min-[300px]",
  wrapperBtn: "mt-[15px] flex justify-center",
  title: "text-center",
};

const SettingProfile = () => {
  // HOOKS
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // STORE
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

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

  const { mutate, isLoading } = PutUpdateProfileDataQuery({
    cb: async () => {
      await getFetchUserProfileDataQuery();
      enqueueSnackbar("Success update info", { variant: "success" });
      errorBack && setErrorBack("");
    },
    errorCb: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
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

    Object.keys(sendData).length && mutate({ data: sendData });
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
      <form>
        {config.fieldsEditName.map((el, key) => (
          <Controller
            key={key}
            control={control}
            rules={el.validate}
            render={({ field: { onChange, value } }) => (
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
            disabled={isLoading}
          >
            {"Submit"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SettingProfile;
