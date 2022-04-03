import {useFormik} from 'formik';
import {LogInArgsType} from '../../../f1-main/m3-API/api';
import {useDispatch, useSelector} from 'react-redux';
import {logInTC} from '../../../f1-main/m2-store/reducers/authRed';
import {AppRootStateType} from '../../../f1-main/m2-store/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';

export const Login = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //редирект на регистрацию, если нет профиля
    const goToRegisterHandler = () => navigate(routesPath.register)

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
        <h1>LOGIN</h1>
        <form onSubmit={formik.handleSubmit}>
            <input id={'email'}
                   type={'email'}
                   placeholder={'email'}
                   {...formik.getFieldProps('email')}/>
            {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}<br/>
            <input id={'password'}
                   type={'password'}
                   placeholder={'password'}
                   {...formik.getFieldProps('password')}/>
            {formik.touched.password && formik.errors.password &&
                <div style={{color: 'red'}}>{formik.errors.password}</div>}<br/>
            <input id={'check'}
                   type={'checkbox'}
                   checked={formik.values.rememberMe}
                   {...formik.getFieldProps('rememberMe')}
            /> Запомнить<br/>
            <button type={'submit'}>Войти</button>
        </form>
        <div>
            If you don't have a profile, then you need to register
            <button onClick={goToRegisterHandler}>Register</button>
        </div>
    </div>
}
//type
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}