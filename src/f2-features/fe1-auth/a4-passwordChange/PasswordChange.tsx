import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {Navigate, useParams} from 'react-router-dom';
import {passwordChangeTC} from '../../../f1-main/m2-store/reducers/authRed';
import {AppRootStateType} from '../../../f1-main/m2-store/store';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';

export const PasswordChange = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const dispatch = useDispatch()
    const param = useParams<'*'>()
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: { password?: string } = {};
            if (values.password.length < 3) errors.password = 'The password is too short'
            return errors;
        },
        onSubmit: (values: { password: string }) => {
            dispatch(passwordChangeTC(values.password, param['*']))
        },
    })
    return <div>
        {!isMe && <Navigate to={routesPath.login}/>}
        <h2>Password Change</h2>
        <form onSubmit={formik.handleSubmit}>
            <input id={'password'}
                   type={'password'}
                   placeholder={'New password'}
                   {...formik.getFieldProps('password')}/>
            {formik.touched.password && formik.errors.password &&
                <div style={{color: 'red'}}>{formik.errors.password}</div>}<br/>
            <button type={'submit'}>Сменить пароль</button>
        </form>
        - страница для создания нового пароля по токену
    </div>
}