import {NavLink, useNavigate} from 'react-router-dom'
import {routesPath} from '../u2-routes/routesPath';
import s from './Header.module.css';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-store/store';
import {logOutTC} from '../../m2-store/reducers/authRed';


export const Header = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler = () => {
        dispatch(logOutTC())
        navigate(routesPath.login)
    }
    return <div className={s.containerMain}>
        <h1>Name of application</h1>
        <div className={s.containerNavLink}>
            <NavLink className={s.navLinkItem} to={routesPath.login}>Login </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.register}>Register </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.passwordRecovery}>PasswordRecovery </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.passwordChange}>PasswordChange </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.profile}>Profile </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.error}>Error </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.test}>Test </NavLink>
            {isMe && <button onClick={logOutHandler}>Log Out</button>}
        </div>
        <hr/>
    </div>
}