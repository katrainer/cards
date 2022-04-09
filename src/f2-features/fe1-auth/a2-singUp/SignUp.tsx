import {useFormik} from 'formik';
import {RegisterType} from '../../../f1-main/m3-API/apiAuth';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../f1-main/m2-store/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import {singUpTC} from '../../../f1-main/m2-store/reducers/authReducer';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import SuperInputText from '../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';

export const SignUp = () => {
    const isMe = useAppSelector<boolean>(state => state.auth.isMe)
    const isRegister = useAppSelector<boolean>(state => state.auth.isRegister)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const returnTiLoginHelper = () => {
        navigate(routesPath.login)
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'The password is too short';
            }
            return errors;
        },
        onSubmit: (values: RegisterType) => {
            dispatch(singUpTC(values));
        },
    });

    return (
        <div>
            <h2>Sing Up</h2>
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
                <SuperButton type={'submit'}>Sign Up</SuperButton>
            </form>
            <div>
                <SuperButton onClick={returnTiLoginHelper}>Return to login</SuperButton>
            </div>
            {isMe && <Navigate to={routesPath.login}/>}
            {isRegister && <Navigate to={routesPath.login}/>}
        </div>
    );
};
//type
type FormikErrorType = {
    email?: string;
    password?: string;
};
