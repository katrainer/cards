import {useFormik} from 'formik';
import {RegisterType} from '../../../f1-main/m3-API/api';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../../f1-main/m1-ui/u2-routes/routesPath';
import {RegisterTC} from '../../../f1-main/m2-store/reducers/Register-reducer';

export const Register = () => {
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values: RegisterType) => {
            dispatch(RegisterTC(values))
        },
    })
    
    return <div>
        <form onSubmit={formik.handleSubmit}>
            <input id={'email'}
                   type={'email'}
                   placeholder={'email'}
                   {...formik.getFieldProps('email')}/><br/>
            <input id={'password'}
                   type={'password'}
                   placeholder={'password'}
                   {...formik.getFieldProps('password')}/>
            <br/>
            <button type={'submit'}>Register</button>
        </form>
        {isRegister && <Navigate to={routesPath.login}/>}
    </div>
}
//type
