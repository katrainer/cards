import {useFormik} from 'formik';
import {passwordRecoveryTC} from '../../../f1-main/m2-store/reducers/authRed';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';

export const PasswordRecovery = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const email = useSelector<AppRootStateType, string>(state => state.auth.profile.email)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: email,
        },
        validate: (values) => {
            const errors: { email?: string } = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values: { email: string }) => {
            dispatch(passwordRecoveryTC(values.email))
        },
    })
    return <div>
        {!isMe && <Navigate to={routesPath.login}/>}
        <h2>Password Recovery</h2>
        <form onSubmit={formik.handleSubmit}>
            <input id={'email'}
                   type={'email'}
                   placeholder={'email'}
                   {...formik.getFieldProps('email')}/>
            {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}<br/>
            <button type={'submit'}>Отправить запрос</button>
        </form>
        - страница для отправки токена на почту для возможности создать новый пароль по токену
    </div>
}