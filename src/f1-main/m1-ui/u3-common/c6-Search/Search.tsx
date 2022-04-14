import SuperInputText from '../c1-SuperInputText/SuperInputText';
import React from 'react';

type SearchPropsType = {
    placeholder?: string
    search: string
    setSearch: (e: string) => void
}

export const Search: React.FC<SearchPropsType> = ({search, setSearch, placeholder}) => {
    return <div>
        <SuperInputText value={search} onChangeText={setSearch} placeholder={placeholder}/>

    </div>
}