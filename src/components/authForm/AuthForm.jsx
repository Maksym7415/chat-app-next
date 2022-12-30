import React from "react";
import { Controller } from "react-hook-form";
import styles from "./AuthForm.module.scss";
import TextInputCustom from "../hookFormsComponents/textInput";
import CustomButton from "../buttons/customButton";

const AuthForm = ({
  title,
  configFields,
  optionsForm,
  errorBack,
  onSubmit,
  submitBtnTitle,
  render,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapperForm}>
        {title && <p className={styles.title}>{title}</p>}
        <React.Fragment>
          {configFields.map((el, key) => (
            <Controller
              key={key}
              control={optionsForm.control}
              rules={el?.validate || {}}
              render={({ field: { onChange, value } }) => (
                <TextInputCustom
                  onChangeText={onChange}
                  value={value}
                  error={optionsForm.errors[el.fieldName]}
                  placeholder={el.placeholder}
                  secureTextEntry={false}
                  styles={el.styles}
                />
              )}
              name={el.fieldName}
            />
          ))}
        </React.Fragment>
        {errorBack && (
          <div className={styles.error}>
            <p className={styles.errorText}>{errorBack}</p>
          </div>
        )}
        <CustomButton
          onClick={optionsForm.handleSubmit(onSubmit)}
          style={{ marginTop: 15, width: "100%", maxWidth: "200px" }}
        >
          {submitBtnTitle}
        </CustomButton>
        {render?.text && render.text(styles)}
      </div>
    </div>
  );
};

export default AuthForm;
