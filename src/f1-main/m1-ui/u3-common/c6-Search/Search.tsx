import SuperInputText from '../c1-SuperInputText/SuperInputText';
import React, {useState} from 'react';
import SuperButton from '../c2-SuperButton/SuperButton';

type SearchPropsType = {
    search:string
    setSearch:(e:string)=>void
}
export const Search: React.FC<SearchPropsType> = ({search,setSearch}) => {
    const [request, setRequest] = useState('')
    
    return <div>
        <SuperInputText value={search} onChangeText={setSearch} placeholder="Search"/>
        
    </div>
}