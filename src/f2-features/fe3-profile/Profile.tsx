import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../f1-main/m2-store/store';
import s from './Profile.module.css'
import {routesPath} from '../../f1-main/m1-ui/u2-routes/routesPath';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import SuperButton from '../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {Modal} from "../../f1-main/m1-ui/u3-common/c4-modal/Modal";
import {ProfileUpdateForm} from "./ProfileUpdateForm/ProfileUpdateForm";

export const Profile = () => {

    const avatar = useSelector<AppRootStateType, string | undefined>((state) => state.profile.profile.avatar)
    const name = useSelector<AppRootStateType, string>((state) => state.profile.profile.name)
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.auth.isMe)

    const [editMode, setEditMode] = useState(false)


    const onClickEditMode = () => {
        setEditMode(!editMode)
    }

    if (!isAuth) return <Navigate to={routesPath.login}/>;
    return <div className={s.profile}>
        <img className={s.avatar} src={avatar} alt="avatar"/>
        <div> {name}</div>
        <SuperButton onClick={onClickEditMode}>Edit mode
        </SuperButton>
        <Modal editMode={editMode} setEditMode={setEditMode}>
            <ProfileUpdateForm setEditMode={setEditMode}/>
        </Modal>
    </div>
}
