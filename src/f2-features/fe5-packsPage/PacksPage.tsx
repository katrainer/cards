import {AppRootStateType, useAppSelector} from '../../f1-main/m2-store/store';
import {getPacksDataType} from '../../f1-main/m3-API/apiPacks';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addPackTC,
    getAllPacks,
    updatePackTC,
    updateRequestPacksDataTC,
} from '../../f1-main/m2-store/reducers/packsReducer';
import {Paginator} from '../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator';
import SuperSelect from '../../f1-main/m1-ui/u3-common/c8-SuperSelect/SuperSelect';
import s from './AllPacks.module.css'
import {PacksHeader} from './p1-PacksHeader/PacksHeader';
import {Packs} from './p2-Packs/Packs';
import {RangeCards} from './p3-RangeCards/RangeCards';
import MyModalPage from '../../f1-main/m1-ui/u3-common/c4-modal/MyModalPage';
import {Navigate} from "react-router-dom";
import {routesPath} from "../../f1-main/m1-ui/u2-routes/routesPath";

const arr = ['16', '12', '8', '4']
export const PacksPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.auth.isMe)
    const totalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector<number>(state => state.packs.requestPacksData.pageCount)
    const requestPacksData = useAppSelector<getPacksDataType>(state => state.packs.requestPacksData)

    const currentPageHelper = useCallback((page: number) => {
        dispatch(updateRequestPacksDataTC({page}))
    }, [])

    useEffect(() => {
        dispatch(getAllPacks())
    }, [requestPacksData])

    const addNewPack = (name: string, privateBoolean: boolean) => {
        dispatch(addPackTC(name, privateBoolean))
    }

    const updatePackHandler = (_id: string, name: string) => {
        dispatch(updatePackTC(_id, name))
    }
    const setCardCount = (pageCount: number) => {
        dispatch(updateRequestPacksDataTC({pageCount}))
    };
    if (!isAuth) return <Navigate to={routesPath.login}/>;
    return (
        <div>
            <h2>All Packs</h2>
            <PacksHeader/>
            <Packs/>
            <div>
                <Paginator totalCount={totalCount} pageCount={pageCount} callback={currentPageHelper}/>
                <div className={s.goFlex}>
                    <SuperSelect
                        options={arr}
                        value={pageCount}
                        onChangeOption={(pageCount) => setCardCount(Number(pageCount))}/>
                    <p>Цифры в селекте - это сколько колод минимально отображаются</p>
                </div>
            </div>
            <RangeCards/>
            <MyModalPage addNewPack={addNewPack} updatePack={updatePackHandler}/>
        </div>
    )
}