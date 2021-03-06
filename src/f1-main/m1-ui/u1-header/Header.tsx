import {useNavigate} from 'react-router-dom'
import {routesPath} from '../u2-routes/routesPath';
import s from './Header.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from 'f1-main/m2-store/store';
import {logOutTC} from 'f1-main/m2-store/reducers/authReducer';
import SuperButton from '../u3-common/c2-SuperButton/SuperButton';
import React from "react";


export const Header = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutHandler = () => {
        dispatch(logOutTC())
        setTimeout(() => navigate(routesPath.login), 1000)
    }
    return <div className={s.containerMain}>
        <div className={s.header}>
        {isMe &&   <SuperButton
            onClick={() => navigate(-1)}
        >   Back
        </SuperButton>}
            <h1>The clever cards</h1>
        <div>{isMe && <SuperButton onClick={logOutHandler}>Log Out</SuperButton>}</div>
        </div>
    </div>
}