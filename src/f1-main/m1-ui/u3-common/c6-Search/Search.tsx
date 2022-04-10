import SuperInputText from '../c1-SuperInputText/SuperInputText';
import React, {useState} from 'react';
import SuperButton from '../c2-SuperButton/SuperButton';

type SearchPropsType = {
    callBack:()=>void
}
export const Search: React.FC<SearchPropsType> = ({callBack}) => {
    const [request, setRequest] = useState('')
    const onClickHandler = () => {
        callBack()
    }
    return <div>
        <SuperInputText value={request} onChangeText={setRequest}/>
        <SuperButton onClick={onClickHandler}>Search</SuperButton>
    </div>
}