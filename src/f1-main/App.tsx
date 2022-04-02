import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.module.css';
import {Login} from '../f2-features/fe1-auth/a1-login/Login';
import {Register} from '../f2-features/fe1-auth/a2-register/Register';
import {Profile} from '../f2-features/fe3-profile/Profile';
import {PasswordRecovery} from '../f2-features/fe1-auth/a3-passwordRecovery/PasswordRecovery';
import {PasswordChange} from '../f2-features/fe1-auth/a4-passwordChange/PasswordChange';
import {Error} from '../f2-features/fe4-error/Error';
import {Test} from '../f2-features/fe0-test/Test';
import {routesPath} from './m1-ui/u2-routes/routesPath';
import {Header} from './m1-ui/u1-header/Header';
import s from './App.module.css'

function App() {
    return (<div className={s.containerMain}>
            <Header/>
            <Routes>
                <Route path={routesPath.login} element={<Login/>}/>
                <Route path={routesPath.register} element={<Register/>}/>
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
