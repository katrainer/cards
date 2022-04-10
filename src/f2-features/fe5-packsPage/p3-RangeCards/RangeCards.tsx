import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {useCallback, useState} from 'react';
import {useAppSelector} from '../../../f1-main/m2-store/store';
import SuperInputText from '../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';

export const RangeCards = () => {
    const min = useAppSelector<number>(state => state.packs.requestPacksData.min)
    const max = useAppSelector<number>(state => state.packs.requestPacksData.max)

    const [minValue, setMinValue] = useState(min.toString())
    const [maxValue, setMaxValue] = useState(max.toString())

    const selectMinValue = useCallback(() => {

    }, [])
    const selectMaxValue = useCallback(() => {

    }, [])
    return <div>
        <div>
            <span>Min range cards</span>
            <SuperInputText type={'number'} value={minValue} onChangeText={setMinValue}/>
            <SuperButton onClick={selectMinValue}>Select</SuperButton>
        </div>
        <div>
            <span>Max range cards</span>
            <SuperInputText type={'number'} value={maxValue} onChangeText={setMaxValue}/>
            <SuperButton onClick={selectMaxValue}>Select</SuperButton>
        </div>
    </div>
}