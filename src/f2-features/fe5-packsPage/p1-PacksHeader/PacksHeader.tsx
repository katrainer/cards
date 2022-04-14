import s from '../AllPacks.module.css';
import {Search} from '../../../f1-main/m1-ui/u3-common/c6-Search/Search';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {useDispatch} from 'react-redux';
import {addPackModalAC} from 'f1-main/m2-store/reducers/modal-reducer';
import {useEffect, useState} from 'react';
import {useDebounce} from '../../../f1-main/m1-ui/u3-common/c10-UseDebounce/useDebounce';
import {updateRequestPacksDataTC} from 'f1-main/m2-store/reducers/packsReducer';

export const PacksHeader = () => {
    const dispatch = useDispatch();

    const [test, setTest] = useState<null | number>(null)
    const [value, setValue] = useState('')
    const packName = useDebounce(value, 1500) as string

    const addPackHandler = () => {
        dispatch(addPackModalAC());
    }
    useEffect(() => {
        if (test) {
            dispatch(updateRequestPacksDataTC({packName}))
        }
        setTest(1)
    }, [packName])


    return (
        <div className={s.goFlex}>
            <Search search={value} setSearch={setValue} placeholder="Search"/>
            <SuperButton onClick={addPackHandler}>Add Pack</SuperButton>
        </div>
    );
};
