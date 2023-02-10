import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import * as config from "./config";
import Avatars from "./components/avatars";
import TextInputCustom from "@/components/hookFormsComponents/textInput";
import CustomButton from "@/components/buttons/customButton";
import { userApi } from "@/rtkQuery/user/serviceRedux";

// STYLES
const classes = {
  container: "w-max w-min-[300px]",
  wrapperBtn: "mt-[15px] flex justify-center",
  title: "text-center",
};

const SettingProfile = () => {
  // HOOKS
  const { enqueueSnackbar } = useSnackbar();

  // STORE
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

  // STATES
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [putUpdateProfileData, { isLoading }] =
    userApi.usePutUpdateProfileDataMutation();

  // FUNCTIONS
  const onSubmit = (data) => {
    const sendData = {};
    if (data.firstName !== userInfo.firstName) {
      sendData.firstName = data.firstName;
    }

    if (data.lastName !== userInfo.lastName) {
      sendData.lastName = data.lastName;
    }

    Object.keys(sendData).length
      ? putUpdateProfileData(sendData)
          .unwrap()
          .then(() => {
            enqueueSnackbar("Success change language", { variant: "success" });
          })
          .catch((err) => {
            console.log(err, "err");
            enqueueSnackbar(error.message, { variant: "error" });
          })
      : enqueueSnackbar("Немає змін щоб оновити дані", { variant: "info" });
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
