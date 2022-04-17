import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {setNewPassTC} from 'f1-main/m2-store/reducers/authReducer';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import SuperInputText from '../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';


export const PasswordChange = () => {
    const dispatch = useDispatch()
    const params = useParams<'*'>()
    const token = params['*']
    const navigate = useNavigate()
    const goToLoginHandler = () => {
        navigate(routesPath.login)
    }
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'The password is too short';
            }
            return errors;
        },
        onSubmit: (values: { password: string }) => {
            dispatch(setNewPassTC(values.password, token))
            navigate(routesPath.login)
        },
    })
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Password change</h2>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    id={'password'}
                    type={'password'}
                    placeholder={'password'}
                    {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <br/>
                <SuperButton type={'submit'}>Change password</SuperButton>
            </form>
        </div>
    )
}

type FormikErrorType = {
    password?: string
}