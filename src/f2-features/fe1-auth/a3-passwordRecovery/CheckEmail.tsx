import { useAppSelector } from 'f1-main/m2-store/store';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const CheckEmail = () => {

    const sentPassword = useAppSelector<string>(state => state.auth.sentPassword)

    if (!sentPassword) {
        return <Navigate to={'/login'}/>
    }

    return (
                <div >
                   <span >Open your Email "{sentPassword}" to see further instructions  </span>
                </div>
    );
};