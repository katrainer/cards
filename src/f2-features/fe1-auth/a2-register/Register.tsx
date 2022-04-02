import {useFormik} from 'formik'
import {auth} from '../../../f1-main/m3-API/api';

export const Register = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: OnSubmitArgsType) => {
            auth.register(values.email, values.password).then(res=>res)
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
    });
    return (
        <div>
            <h2>Register</h2>
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
                <button type={'submit'}>Войти</button>
            </form>
        </div>
    )
}
//type
type FormikErrorType = {
    email?: string
    password?: string
}
type OnSubmitArgsType = {
    email: string
    password: string
}
