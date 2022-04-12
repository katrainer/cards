import SuperInputText from '../c1-SuperInputText/SuperInputText';
import React, {useState} from 'react';
import SuperButton from '../c2-SuperButton/SuperButton';

type SearchPropsType = {
    callBack:()=>void
    placeholder?: string
}
export const Search: React.FC<SearchPropsType> = ({callBack, placeholder}) => {
    const [request, setRequest] = useState('')
    const onClickHandler = () => {
        callBack()
    }
    return <div>
        <SuperInputText placeholder={placeholder} value={request} onChangeText={setRequest}/>
        <SuperButton onClick={onClickHandler}>Search</SuperButton>
    </div>
}