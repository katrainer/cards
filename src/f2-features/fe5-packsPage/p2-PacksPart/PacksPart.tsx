import {Packs} from './p2-Packs/Packs';
import {Paginator} from '../../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator';
import SuperSelect from '../../../f1-main/m1-ui/u3-common/c8-SuperSelect/SuperSelect';
import MyModalPage from '../../../f1-main/m1-ui/u3-common/c4-modal/MyModalPage';
import React, {useCallback} from 'react';
import {addPackTC, updatePackTC, updateRequestPacksDataTC} from '../../../f1-main/m2-store/reducers/packsReducer';
import {useAppSelector} from '../../../f1-main/m2-store/store';
import {useDispatch} from 'react-redux';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {addPackModalAC} from '../../../f1-main/m2-store/reducers/modal-reducer';
import s from './PacksPart.module.css'

const arr = ['16', '12', '8', '4']

export const PacksPart = () => {
    const dispatch = useDispatch()
    const totalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector<number>(state => state.packs.requestPacksData.pageCount)
    const currentPageHelper = useCallback((page: number) => {
        dispatch(updateRequestPacksDataTC({page}))
    }, [])
    const addNewPack = (name: string, privateBoolean: boolean) => {
        dispatch(addPackTC(name, privateBoolean))
    }

    const updatePackHandler = (_id: string, name: string) => {
        dispatch(updatePackTC(_id, name))
    }
    const setCardCount = (pageCount: number) => {
        dispatch(updateRequestPacksDataTC({pageCount}))
    }
    const addPackHandler = () => {
        dispatch(addPackModalAC())
    }
    return <>
        <h2>Packs</h2>
        <div className={s.addButton}>
            <SuperButton onClick={addPackHandler}>Add Pack</SuperButton>
        </div>
        <Packs/>
        <div className={s.footerTable}>
            <div style={{width:40}}></div>
            <Paginator totalCount={totalCount} pageCount={pageCount} callback={currentPageHelper}/>
            <div>
                <SuperSelect
                    options={arr}
                    value={pageCount}
                    onChangeOption={(pageCount) => setCardCount(Number(pageCount))}
                />
            </div>
        </div>
        <MyModalPage addNewPack={addNewPack} updatePack={updatePackHandler}/>
    </>
}