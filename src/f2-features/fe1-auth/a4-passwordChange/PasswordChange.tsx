import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "f1-main/m2-store/store";
import { setNewPassTC } from "f1-main/m2-store/reducers/authRed";


export const PasswordChange = () => {

const passwordIsCreated = useAppSelector<boolean>(state => state.auth.passwordIsCreated)
const dispatch = useDispatch()
const params = useParams<'*'>()
const token = params['*']

    const formik = useFormik({
        initialValues: {
          password: "",
        },
        validate: (values) => {
          const errors: FormikErrorType = {};
          if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 4) {
            errors.password = 'The password is too short';
        }
        return errors;
        },
        onSubmit: (values: {password:string}) => {
          dispatch(setNewPassTC(values.password, token));
        },
      });
    

 return (
    <div>
        {/* <h1>Скоро все будет ;)</h1> */}
        {passwordIsCreated && <Navigate to={'/login'}/>}
    <h1>Remove password</h1>
  <form onSubmit={formik.handleSubmit}>
    <input
      id={"password"}
      type={"password"}
      placeholder={"password"}
      {...formik.getFieldProps("password")}
    />
    {formik.errors.password && formik.touched.password ? (
      <div>{formik.errors.password}</div>
    ) : null}
    <br />
    <button type={"submit"}>Change password</button>
  </form>
</div>

 )
}

type FormikErrorType = {
    password?: string
}