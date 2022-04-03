import {useFormik} from 'formik';
import {LogInArgsType} from '../../../f1-main/m3-API/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import {isRegisterTC} from '../../../f1-main/m2-store/reducers/authRed';

export const Register = () => {
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.auth.isRegister)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 3) errors.password = 'The password is too short'
            return errors;
        },
        onSubmit: (values: LogInArgsType) => {
            dispatch(isRegisterTC(values))
        },
    })
    return <div>
        {isRegister && <Navigate to={routesPath.login}/>}
        <h1>REGISTER</h1>
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
            <button type={'submit'}>Register</button>
        </form>
    </div>
}
//type
type FormikErrorType = {
    email?: string
    password?: string
}