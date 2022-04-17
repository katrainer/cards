import {Search} from '../../../f1-main/m1-ui/u3-common/c6-Search/Search';
import {Profile} from '../../fe3-profile/Profile';
import React, {useEffect, useState} from 'react';
import {useDebounce} from '../../../f1-main/m1-ui/u3-common/c10-UseDebounce/useDebounce';
import {updateRequestPacksDataTC} from '../../../f1-main/m2-store/reducers/packsReducer';
import {useDispatch} from 'react-redux';
import s from './PacksBar.module.css'
import {RangeCards} from './p1-RangeCards/RangeCards';
import {useAppSelector} from '../../../f1-main/m2-store/store';

export const PacksBar = () => {
    const dispatch = useDispatch()
    const user_id = useAppSelector<string>(state => state.profile.profile._id)

    const [initialization, setInitialization] = useState<null | number>(null)

    const [activeMode, setActiveMode] = useState<1 | null>(1)

    const [value, setValue] = useState('')
    const packName = useDebounce(value, 1500) as string

    useEffect(() => {
        if (initialization) {
            dispatch(updateRequestPacksDataTC({packName}))
        }
        setInitialization(1)
    }, [packName])

    const goToAllPacksHandler = () => {
        setActiveMode(null)
    }
    const goToMyPacksHandler = () => {
        setActiveMode(1)
    }

    useEffect(() => {
        if (initialization) {
            activeMode ? dispatch(updateRequestPacksDataTC({user_id})) :
                dispatch(updateRequestPacksDataTC({user_id: ''}))
        }
        setInitialization(1)
    }, [activeMode])


    return <>
        <div className={s.titleContainer}>
            <div className={!activeMode ? s.red : undefined}
                 onClick={goToAllPacksHandler}>
                All packs
            </div>
            <div className={activeMode ? s.red : undefined}
                 onClick={goToMyPacksHandler}>
                My packs
            </div>
        </div>
        <div className={s.otherContainer}>
            <Search search={value} setSearch={setValue} placeholder="Search"/>
            <div>
                <RangeCards/>
            </div>
            <Profile/>
            <div>
                tegs...
            </div>
        </div>
    </>
}