import {useAppSelector} from '../../f1-main/m2-store/store';
import {getPacksDataType, PackType} from '../../f1-main/m3-API/apiPacks';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {PacksHeaderLine} from './p2-Packs/p1-PacksHeaderLine/PacksHeaderLine';
import {Pack} from './p2-Packs/p2-PacksList/p1-Pack/Pack';
import {useDispatch} from 'react-redux';
import {getAllPacks} from '../../f1-main/m2-store/reducers/packsReducer';
import SuperButton from '../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {Search} from 'f1-main/m1-ui/u3-common/c6-Search/Search';
import {Paginator} from '../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator';
import SuperSelect from '../../f1-main/m1-ui/u3-common/c8-SuperSelect/SuperSelect';
import s from './AllPacks.module.css'
import {PacksList} from './p2-Packs/p2-PacksList/PacksList';
import {PacksHeader} from './p1-PacksHeader/PacksHeader';
import {Packs} from './p2-Packs/Packs';
import {RangeCards} from './p3-RangeCards/RangeCards';

const arr = ['16', '12', '8', '4']
export const PacksPage = () => {
    const dispatch = useDispatch()
    const totalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector<number>(state => state.packs.requestPacksData.pageCount)
    const requestPacksData = useAppSelector<getPacksDataType>(state => state.packs.requestPacksData)

    const [valueSelect, setValueSelect] = useState(arr[3])


    const currentPageHelper = useCallback(() => {

    }, [])

    useEffect(() => {
        dispatch(getAllPacks())
    }, [requestPacksData])

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
                        value={valueSelect}
                        onChangeOption={setValueSelect}/>
                    <p>Цифры в селекте - это сколько колод минимально отображаются</p>
                </div>
            </div>
            <RangeCards/>
        </div>
    )
}