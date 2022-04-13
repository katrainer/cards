import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import { deletePackModalAC, updatePackModalAC } from 'f1-main/m2-store/reducers/modal-reducer';
import { packs } from 'f1-main/m3-API/apiPacks';
import React from 'react';
import { useDispatch } from 'react-redux';
import s from './Pack.module.css'


type PackPropsType = {
    name: string
    cardsCount: number
    update: string
    id:string
}
export const Pack: React.FC<PackPropsType> = ({name, cardsCount, update, id }) => {

    const dispatch = useDispatch();

const deletePack= () => {
    dispatch(deletePackModalAC(id,name))
}
const updatePack= () => {
    dispatch(updatePackModalAC(id,name))
}

    return <div className={s.container}>
        <span>{name}</span>
        <span>{cardsCount}</span>
        <span>{update}</span>
        <span>
            <SuperButton onClick={deletePack}>Delete</SuperButton>
            <SuperButton onClick={updatePack}>Edite</SuperButton>
            <SuperButton>Learn</SuperButton>
        </span>
    </div>
}