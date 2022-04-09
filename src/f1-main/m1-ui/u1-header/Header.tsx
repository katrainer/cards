import {NavLink, useNavigate} from 'react-router-dom'
import {routesPath} from '../u2-routes/routesPath';
import s from './Header.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from 'f1-main/m2-store/store';
import { logOutTC } from 'f1-main/m2-store/reducers/authReducer';
import SuperButton from '../u3-common/c2-SuperButton/SuperButton';


export const Header = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler = () => {
        dispatch(logOutTC())
        navigate(routesPath.login)
    }
    return <div className={s.containerMain}>
        <h1>The clever cards</h1>
        <div className={s.containerNavLink}>
            <NavLink className={s.navLinkItem} to={routesPath.login}>Login </NavLink>
            {/*<NavLink className={s.navLinkItem} to={routesPath.signUp}>Sign Up </NavLink>*/}
            {/*<NavLink className={s.navLinkItem} to={routesPath.passwordRecovery}>PasswordRecovery </NavLink>*/}
            {/*<NavLink className={s.navLinkItem} to={routesPath.passwordChange}>PasswordChange </NavLink>*/}
            <NavLink className={s.navLinkItem} to={routesPath.profile}>Profile </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.error}>Error </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.test}>Test </NavLink>
            {isMe && <SuperButton onClick={logOutHandler}>Log Out</SuperButton>}
        </div>
        <hr/>
    </div>
}