import {useSelector} from "react-redux";
import {AppRootStateType} from "../../f1-main/m2-store/store";
import s from "./Profile.module.css"

export const Profile = () => {
    const profile = useSelector((state: AppRootStateType) => state.profilePage.profile)

    return <div>
        <img className={s.avatar} src={profile.avatar} alt="avatar"/>
       <div> {profile.name}</div>
        <button>Edit mode</button>
    </div>
}