import {useFormik} from 'formik';
import {LogInArgsType} from '../../../f1-main/m3-API/apiAuth';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../f1-main/m2-store/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import {logInTC} from 'f1-main/m2-store/reducers/authReducer';
import SuperInputText from '../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../../f1-main/m1-ui/u3-common/c3-SuperCheckbox/SuperCheckbox';

export const Login = () => {
    const isMe = useAppSelector<boolean>(state => state.auth.isMe)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //редирект на регистрацию, если нет профиля
    const goToRegisterHandler = () => navigate(routesPath.signUp)
    const goToPasswordRecovery = () => navigate(routesPath.passwordRecovery)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 7) errors.password = 'The password is too short'
            return errors;
        },
        onSubmit: (values: LogInArgsType) => {
            dispatch(logInTC(values))
        },
    })
    return <div>
        {isMe && <Navigate to={routesPath.profile}/>}
        <h2>LOGIN</h2>
        <form onSubmit={formik.handleSubmit}>
            <SuperInputText id={'email'}
                   type={'email'}
                   placeholder={'email'}
                   {...formik.getFieldProps('email')}/>
            {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}<br/>
            <SuperInputText id={'password'}
                   type={'password'}
                   placeholder={'password'}
                   {...formik.getFieldProps('password')}/>
            {formik.touched.password && formik.errors.password &&
                <div style={{color: 'red'}}>{formik.errors.password}</div>}<br/>
            <SuperCheckbox id={'check'}
                   type={'checkbox'}
                   checked={formik.values.rememberMe}
                   {...formik.getFieldProps('rememberMe')}
            /> Запомнить<br/>
            <SuperButton type={'submit'}>Войти</SuperButton>
        </form>
        <SuperButton onClick={goToPasswordRecovery}>Forgot your password?</SuperButton>
        <div>
            If you don't have a profile, then you need to register
            <SuperButton onClick={goToRegisterHandler}>Register</SuperButton>
        </div>
    </div>
}
//type
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}