import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../f1-main/m2-store/store';
import {Navigate} from 'react-router-dom';
import {routesPath} from '../../f1-main/m1-ui/u2-routes/routesPath';
import {ProfileType} from '../../f1-main/m3-API/api';

export const Profile = () => {
    const isMe = useSelector<AppRootStateType, boolean>(state => state.auth.isMe)
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.auth.profile)

    return <div>
        {!isMe && <Navigate to={routesPath.login}/>}

        <div>{profile.name}</div>
        <div><img src={profile.avatar} alt="avatar"/></div>
    </div>
}