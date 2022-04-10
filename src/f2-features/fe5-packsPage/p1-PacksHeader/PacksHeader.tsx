import s from '../AllPacks.module.css';
import {Search} from '../../../f1-main/m1-ui/u3-common/c6-Search/Search';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import React, {useCallback} from 'react';

export const PacksHeader = () => {
    const searchHandler = useCallback(() => {

    }, [])
    const addPackHandler = useCallback(() => {

    }, [])
    return <div className={s.goFlex}>
        <Search callBack={searchHandler}/>
        <SuperButton onClick={addPackHandler}>Add Pack</SuperButton>
    </div>
}