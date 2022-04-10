import {useAppSelector} from '../../f1-main/m2-store/store';
import {getPacksDataType, PackType} from '../../f1-main/m3-API/apiPacks';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {AllPacksHeader} from './AllPacksHeader/AllPacksHeader';
import {Pack} from './Pack/Pack';
import {useDispatch} from 'react-redux';
import {getAllPacks} from '../../f1-main/m2-store/reducers/packsReducer';
import SuperButton from '../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {Search} from 'f1-main/m1-ui/u3-common/c6-Search/Search';
import {Paginator} from '../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator';
import SuperSelect from '../../f1-main/m1-ui/u3-common/c8-SuperSelect/SuperSelect';
import s from './AllPacks.module.css'

const arr = ['16', '12', '8', '4']
export const AllPacks = () => {
    const dispatch = useDispatch()
    const packs = useAppSelector<PackType[]>(state => state.packs.packs)
    const totalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector<number>(state => state.packs.requestPacksData.pageCount)
    const requestPacksData = useAppSelector<getPacksDataType>(state => state.packs.requestPacksData)

    const [valueSelect, setValueSelect] = useState(arr[3])

    const mapPacks = useMemo(() => {
        return packs.map(t =>
            <Pack name={t.name} cardsCount={t.cardsCount} update={t.updated} key={t._id}/>
        )
    }, [packs])

    const searchHandler = useCallback(() => {

    }, [])
    const addPackHandler = useCallback(() => {

    }, [])

    const currentPageHelper = useCallback(() => {

    }, [])

    useEffect(() => {
        dispatch(getAllPacks())
    }, [requestPacksData])

    return (
        <div>
            <h2>All Packs</h2>
            <div className={s.goFlex}>
                <Search callBack={searchHandler}/>
                <SuperButton onClick={addPackHandler}>Add Pack</SuperButton>
            </div>
            <div>
                <div>
                    <AllPacksHeader/>
                </div>
                <div>
                    {mapPacks}
                </div>
            </div>
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
        </div>
    )
}