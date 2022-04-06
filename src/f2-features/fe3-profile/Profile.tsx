import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../f1-main/m2-store/store";
import s from "./Profile.module.css"
import {getProfile} from "../../f1-main/m2-store/reducers/ProfileReducer";
import {routesPath} from "../../f1-main/m1-ui/u2-routes/routesPath";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SuperButton from "../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import SuperInputText from "../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText";

export const Profile = () => {
    const dispatch = useDispatch();
    const avatar = useSelector<AppRootStateType, string | undefined>((state) => state.profilePage.profile.avatar)
    const name = useSelector<AppRootStateType, string>((state) => state.profilePage.profile.name)
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.profilePage.isAuth)

    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    const onClickEditMode = () => {
        setEditMode(!editMode)
    }

    if (!isAuth) return <Navigate to={routesPath.login}/>;
    return <div>
        <img className={s.avatar} src={avatar} alt="avatar"/>
        <div> {name}</div>
        <SuperButton onClick={onClickEditMode}>Edit mode
        </SuperButton>
        {editMode && <div>
            <SuperInputText type="text"/>
            <SuperInputText type="text"/>
        </div>}
    </div>
}