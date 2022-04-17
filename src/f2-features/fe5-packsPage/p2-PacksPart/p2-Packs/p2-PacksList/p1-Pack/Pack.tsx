import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {updatePackModalAC} from 'f1-main/m2-store/reducers/modal-reducer';
import React from 'react';
import {useDispatch} from 'react-redux';
import s from './Pack.module.css'
import {deletePackTC} from '../../../../../../f1-main/m2-store/reducers/packsReducer';
import {routesPath} from '../../../../../../f1-main/m1-ui/u2-routes/routesPath';
import {useNavigate} from 'react-router-dom';
import {TiBrush} from 'react-icons/ti';
import {AiOutlineDelete} from 'react-icons/ai';


type PackPropsType = {
    name: string
    cardsCount: number
    update: string
    id: string
    owner: string
}
export const Pack: React.FC<PackPropsType> = ({name, cardsCount, update, id, owner}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const deletePackHandler = () => {
        dispatch(deletePackTC(id))
    }
    const updatePack = () => {
        dispatch(updatePackModalAC(id, name))
    }
    console.log(`${routesPath.learn}${id}`)
    return <div className={s.mainContainer}>
        <div>{owner}</div>
        <div>{name}</div>
        <div>{cardsCount}</div>
        <div>{update}</div>
        <div className={s.buttonsContainer}>
            <div>
                <div><SuperButton onClick={() => navigate(`${routesPath.learn}/${id}/${name}`)}>
                    Learn
                </SuperButton></div>
                <div><SuperButton onClick={() => navigate(`${routesPath.card}/${id}/${name}`)}>
                    Cards
                </SuperButton></div>
            </div>
            <div className={s.buttonsIcon}>
                <div onClick={updatePack}><TiBrush/></div>
                <div onClick={deletePackHandler}><AiOutlineDelete/></div>
            </div>
        </div>
    </div>
}