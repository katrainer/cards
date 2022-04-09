import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import React from 'react';
import s from './Pack.module.css'


type PackPropsType = {
    name: string
    cardsCount: number
    update: string
}
export const Pack: React.FC<PackPropsType> = ({name, cardsCount, update}) => {
    return <div className={s.container}>
        <span >{name}</span>
        <span>{cardsCount}</span>
        <span>{update}</span>
        <span>
            <SuperButton>Delete</SuperButton>
            <SuperButton>Edite</SuperButton>
            <SuperButton>Learn</SuperButton>
        </span>
    </div>
}