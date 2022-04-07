import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendTokenTC, setTokenIsSentAC } from "f1-main/m2-store/reducers/authRed";
import { AppRootStateType, useAppSelector } from "f1-main/m2-store/store";
import { PasswordRecoveryType } from "f1-main/m3-API/api";
import { Navigate } from "react-router-dom";

export const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const sentPassword = useAppSelector<string>(state => state.auth.sentPassword)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isMe)

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values: { email:string}) => {
      dispatch(sendTokenTC(values.email));
    },
  });
  
  if (sentPassword) {
    dispatch(setTokenIsSentAC(false))
    return <Navigate to={'/checkEmail'}/>
}
if (isLoggedIn) {
    return <Navigate to={'/profile'}/>
}

  return (
  <div>
        <h1>Remove password</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id={"email"}
          type={"email"}
          placeholder={"email"}
          {...formik.getFieldProps("email")}
        />
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <br />
        <button type={"submit"}>Reset password</button>
      </form>
    </div>
  );
};
type FormikErrorType = {
  email?: string;
};
