import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../f1-main/m2-store/store';
import SuperInputText from '../../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import {useDispatch} from 'react-redux';
import {updateRequestPacksDataTC} from '../../../../f1-main/m2-store/reducers/packsReducer';
import {useDebounce} from '../../../../f1-main/m1-ui/u3-common/c10-UseDebounce/useDebounce';
import s from './RangeCards.module.css'

export const RangeCards = () => {
    const dispatch = useDispatch()
    const [test, setTest] = useState<null | number>(null)
    const minValue = useAppSelector<number>(state => state.packs.requestPacksData.min)
    const maxValue = useAppSelector<number>(state => state.packs.requestPacksData.max)
    const [valueMin, setValueMin] = useState(minValue.toString())
    const min = useDebounce(valueMin, 1500) as string

    const [valueMax, setValueMax] = useState(maxValue.toString())
    const max = useDebounce(valueMax, 1500) as string


    useEffect(() => {
        if (test) dispatch(updateRequestPacksDataTC({min: +min}))
        setTest(1)
    }, [min])
    useEffect(() => {
        if (test) dispatch(updateRequestPacksDataTC({max: +max}))
        setTest(1)
    }, [max])


    return <>
        <div className={s.range}>
            <span>Min range cards</span>
            <SuperInputText type={'number'} value={valueMin} onChangeText={setValueMin}/>
        </div>
        <div className={s.range}>
            <span>Max range cards</span>
            <SuperInputText type={'number'} value={valueMax} onChangeText={setValueMax}/>
        </div>
    </>
}