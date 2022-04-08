import {useFormik} from 'formik';
import {RegisterType} from '../../../f1-main/m3-API/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppSelector} from '../../../f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import {registerTC} from '../../../f1-main/m2-store/reducers/authRed';

export const SignUp = () => {

    const LoggedIn = useAppSelector<boolean>(state => state.auth.isMe)
    const Register = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isRegister
    );
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.firstName) {
                errors.firstName = 'Required';
            } else if (values.firstName.length < 3) {
                errors.firstName = 'The name is too short';
            }
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'The password is too short';
            }
            return errors;
        },
        onSubmit: (values: RegisterType) => {
            dispatch(registerTC(values));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input
                    id={'firstName'}
                    type={'text'}
                    placeholder={'First Name'}
                    {...formik.getFieldProps('firstName')}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <br/>
                <input
                    id={'lastName'}
                    type={'text'}
                    placeholder={'Last Name'}
                    {...formik.getFieldProps('lastName')}
                />{' '}
                <br/>
                <input
                    id={'email'}
                    type={'email'}
                    placeholder={'email'}
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <br/>
                <input
                    id={'password'}
                    type={'password'}
                    placeholder={'password'}
                    {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <br/>
                <button type={'submit'}>Sign Up</button>
            </form>
            {Register && <Navigate to={routesPath.login}/>}
            {LoggedIn && <Navigate to={routesPath.profile}/>}
        </div>
    );
};
//type
type FormikErrorType = {
    email?: string;
    password?: string;
    firstName?: string;
};
