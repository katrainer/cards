import {NavLink} from "react-router-dom"
import {routesPath} from "../u2-routes/routesPath";
import s from "./Header.module.css";


export const Header = () =>{
    return <div className={s.containerMain}>
        <h1>Name of application</h1>
        <div className={s.containerNavLink}>
            <NavLink className={s.navLinkItem} to={routesPath.login}>Login </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.signUp}>Sign Up </NavLink>
            {/* <NavLink className={s.navLinkItem} to={routesPath.passwordRecovery}>PasswordRecovery </NavLink> */}
            <NavLink className={s.navLinkItem} to={routesPath.passwordChange}>PasswordChange </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.profile}>Profile </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.error}>Error </NavLink>
            <NavLink className={s.navLinkItem} to={routesPath.test}>Test </NavLink>
        </div>
        <hr/>
    </div>
}