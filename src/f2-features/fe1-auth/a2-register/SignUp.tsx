import {useFormik} from 'formik';
import {RegisterType} from '../../../f1-main/m3-API/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import {RegisterTC} from '../../../f1-main/m2-store/reducers/signUp-reducer';

export const SignUp = () => {
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName:'',
            lastName:''
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
        onSubmit: (values: RegisterType) => {
            dispatch(RegisterTC(values))
        },
    })
    
    return <div>
        <form onSubmit={formik.handleSubmit}>
        <input id={'firstName'}
                   type={'text'}
                   placeholder={'First Name'}
                   {...formik.getFieldProps('firstName')}/><br/>
                   <input id={'lastName'}
                   type={'text'}
                   placeholder={'Last Name'}
                   {...formik.getFieldProps('lastName')}/>
                   <br/>
            <input id={'email'}
                   type={'email'}
                   placeholder={'email'}
                   {...formik.getFieldProps('email')}/>
                   {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}<br/>
            <input id={'password'}
                   type={'password'}
                   placeholder={'password'}
                   {...formik.getFieldProps('password')}/>
                   {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}<br/>
            <button type={'submit'}>Sign Up</button>
        </form>
        {isRegister && <Navigate to={routesPath.login}/>}
    </div>
}
//type
type FormikErrorType={
    email?:string,
    password?:string
}