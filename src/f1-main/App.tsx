import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.module.css';
import {Login} from '../f2-features/fe1-auth/a1-login/Login';
import {SignUp} from '../f2-features/fe1-auth/a2-register/SignUp';
import {Profile} from '../f2-features/fe3-profile/Profile';
import {PasswordRecovery} from '../f2-features/fe1-auth/a3-passwordRecovery/PasswordRecovery';
import {PasswordChange} from '../f2-features/fe1-auth/a4-passwordChange/PasswordChange';
import {Error} from '../f2-features/fe4-error/Error';
import {Test} from '../f2-features/fe0-test/Test';
import {routesPath} from './m1-ui/u2-routes/routesPath';
import {Header} from './m1-ui/u1-header/Header';
import s from './App.module.css'
import {useDispatch} from 'react-redux';
import {isMeTC} from './m2-store/reducers/authRed';
import {useAppSelector} from "./m2-store/store";
import Preloader from "./m1-ui/u3-common/Preloader/Preloader";

function App() {

    const isLoading = useAppSelector(store => store.app.isLoading)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isMeTC())
    }, [])

    if(isLoading) return <Preloader/>

    return (
        <div className={s.containerMain}>
            <Header/>
            <Routes>
                <Route path={routesPath.login} element={<Login/>}/>
                <Route path={routesPath.signUp} element={<SignUp/>}/>
                <Route path={routesPath.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={routesPath.passwordChange} element={<PasswordChange/>}/>
                <Route path={routesPath.profile} element={<Profile/>}/>
                <Route path={routesPath.error} element={<Error/>}/>
                <Route path={routesPath.test} element={<Test/>}/>
            </Routes>
        </div>
    )
}

export default App;
