import {AppRootStateType, useAppSelector} from '../../f1-main/m2-store/store';
import {getPacksDataType} from '../../f1-main/m3-API/apiPacks';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPacks,} from '../../f1-main/m2-store/reducers/packsReducer';
import s from './AllPacks.module.css'
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../f1-main/m1-ui/u2-routes/routesPath';
import {PacksPart} from './p2-PacksPart/PacksPart';
import {PacksBar} from './p1-PacksBar/PacksBar';


export const PacksPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.auth.isMe)

    const requestPacksData = useAppSelector<getPacksDataType>(state => state.packs.requestPacksData)


    useEffect(() => {
        dispatch(getAllPacks())
    }, [requestPacksData])


    if (!isAuth) return <Navigate to={routesPath.login}/>;
    return (
        <div className={s.mainContainer}>
            <div className={s.leftBarContainer}>
                <PacksBar/>
            </div>
            <div className={s.rightBarContainer}>
                <PacksPart/>
            </div>
        </div>
    )
}