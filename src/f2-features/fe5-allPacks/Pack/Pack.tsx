import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import React from 'react';

type PackPropsType = {
    name: string
    cardsCount: number
    update: string
}
export const Pack: React.FC<PackPropsType> = ({name, cardsCount, update}) => {
    return <>
        <span>{name}</span>
        <span>{cardsCount}</span>
        <span>{update}</span>
        <span>
            <SuperButton>Delete</SuperButton>
            <SuperButton>Edite</SuperButton>
            <SuperButton>Learn</SuperButton>
        </span>
    </>
}