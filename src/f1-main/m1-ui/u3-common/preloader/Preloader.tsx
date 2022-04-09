import React from 'react';
import s from './Preloader.module.css'
import preloader from "f2-features/assets/image/smile.gif";

const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img src={preloader}/>
        </div>
    );
};

export default Preloader;