import {useAppSelector} from '../../f1-main/m2-store/store';
import {getPacksDataType, PackType} from '../../f1-main/m3-API/apiPacks';
import {useEffect, useMemo} from 'react';
import {AllPacksHeader} from './AllPacksHeader/AllPacksHeader';
import {Pack} from './Pack/Pack';
import {useDispatch} from 'react-redux';
import {getAllPacks} from '../../f1-main/m2-store/reducers/packsReducer';
import SuperButton from '../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {Search} from 'f1-main/m1-ui/u3-common/c6-Search/Search';

export const AllPacks = () => {
    const dispatch = useDispatch()
    const packs = useAppSelector<PackType[]>(state => state.packs.packs)
    const requestPacksData = useAppSelector<getPacksDataType>(state => state.packs.requestPacksData)

    const mapPacks = useMemo(() => {
        return packs.map(t => <div key={t._id}>
            <Pack name={t.name} cardsCount={t.cardsCount} update={t.updated}/>
        </div>)
    }, [packs])

    const searchHandler = () => {

    }
    const addPackHandler = () => {

    }
    useEffect(() => {
        dispatch(getAllPacks())
    }, [requestPacksData])

    return (
        <div>
            <h2>All Packs</h2>
            <div>
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

            </div>
        </div>
    )
}