import {useAppSelector} from '../../f1-main/m2-store/store';
import {getPacksDataType, PackType} from '../../f1-main/m3-API/apiPacks';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {PacksHeaderLine} from './p2-Packs/p1-PacksHeaderLine/PacksHeaderLine';
import {Pack} from './p2-Packs/p2-PacksList/p1-Pack/Pack';
import {useDispatch} from 'react-redux';
import {addPackTC, deletePackTC, getAllPacks, updatePackTC} from '../../f1-main/m2-store/reducers/packsReducer';
import SuperButton from '../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {Search} from 'f1-main/m1-ui/u3-common/c6-Search/Search';
import {Paginator} from '../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator';
import SuperSelect from '../../f1-main/m1-ui/u3-common/c8-SuperSelect/SuperSelect';
import s from './AllPacks.module.css'
import {PacksList} from './p2-Packs/p2-PacksList/PacksList';
import {PacksHeader} from './p1-PacksHeader/PacksHeader';
import {Packs} from './p2-Packs/Packs';
import {RangeCards} from './p3-RangeCards/RangeCards';
import { Modal } from 'f1-main/m1-ui/u3-common/c4-modal/Modal';
import MyModalPage from './Modal/MyModalPage';
import { useDebounce } from 'f1-main/m1-ui/u3-common/c10-UseDebounce/useDebounce';

const arr = ['16', '12', '8', '4']
export const PacksPage = () => {
    const dispatch = useDispatch()
    const totalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector<number>(state => state.packs.requestPacksData.pageCount)
    const requestPacksData = useAppSelector<getPacksDataType>(state => state.packs.requestPacksData)
    const packs = useAppSelector(state=> state.packs.packs)

    const [search, setSearch]= useState('')
    const searchDebounce = useDebounce(search, 1500)


    const [valueSelect, setValueSelect] = useState(arr[3])


    const currentPageHelper = useCallback(() => {

    }, [])

    useEffect(() => {
        dispatch(getAllPacks(String(searchDebounce)))
    }, [requestPacksData,searchDebounce])

    const addNewPack = (name: string, privateBoolean: boolean) => {
        dispatch(addPackTC(name, privateBoolean))
    }

    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const updatePack = (_id: string, name: string) => {
       dispatch(updatePackTC(_id,name))
    }

    return (
        <div>
            <h2>All Packs</h2>
            <PacksHeader search={search} setSearch={setSearch}/>
            <Packs/>
            <div>
                <Paginator totalCount={totalCount} pageCount={pageCount} callback={currentPageHelper}/>
                <div className={s.goFlex}>
                    <SuperSelect
                        options={arr}
                        value={valueSelect}
                        onChangeOption={setValueSelect}/>
                    <p>Цифры в селекте - это сколько колод минимально отображаются</p>
                </div>
            </div>
            <RangeCards/>
            <MyModalPage addNewPack={addNewPack} deletePack={deletePack} updatePack={updatePack}/>
        </div>
    )
}