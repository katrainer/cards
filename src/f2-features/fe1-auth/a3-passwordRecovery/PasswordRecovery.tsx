import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {sendTokenTC} from 'f1-main/m2-store/reducers/authReducer';
import {useAppSelector} from 'f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import SuperInputText from '../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import {routesPath} from 'f1-main/m1-ui/u2-routes/routesPath';

export const PasswordRecovery = () => {
    const dispatch = useDispatch()
    const isMe = useAppSelector<boolean>(state => state.auth.isMe)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values: { email: string }) => {
            dispatch(sendTokenTC(values.email))
        }
    })
    if (isMe) return <Navigate to={routesPath.login}/>
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Passport restoration</h2>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    id={'email'}
                    type={'email'}
                    placeholder={'email'}
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <br/>
                <SuperButton type={'submit'}>Reset password</SuperButton>
            </form>
        </div>
    )
}
type FormikErrorType = {
    email?: string;
};
