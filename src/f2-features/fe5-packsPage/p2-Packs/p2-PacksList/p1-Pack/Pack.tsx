import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {updatePackModalAC} from 'f1-main/m2-store/reducers/modal-reducer';
import React from 'react';
import {useDispatch} from 'react-redux';
import s from './Pack.module.css'
import {deletePackTC} from '../../../../../f1-main/m2-store/reducers/packsReducer';
import {routesPath} from "../../../../../f1-main/m1-ui/u2-routes/routesPath";
import {useNavigate} from "react-router-dom";


type PackPropsType = {
    name: string
    cardsCount: number
    update: string
    id: string
}
export const Pack: React.FC<PackPropsType> = ({name, cardsCount, update, id}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const deletePackHandler = () => {
        dispatch(deletePackTC(id))
    }
    const updatePack = () => {
        dispatch(updatePackModalAC(id, name))
    }
    return <div className={s.container}>
        <span>{name}</span>
        <span>{cardsCount}</span>
        <span>{update}</span>
        <span>
            <SuperButton onClick={deletePackHandler}>Delete</SuperButton>
            <SuperButton onClick={updatePack}>Edite</SuperButton>
            <SuperButton>Learn</SuperButton>
            <SuperButton onClick={() => navigate(routesPath.card, {state: {packId: id, packName: name}})}>
             Cards
            </SuperButton>
        </span>
    </div>
}