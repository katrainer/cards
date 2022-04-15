import React, {FC} from "react";
import s from './Card.module.css'


export const TableHeaders: FC = () => {


    return (
        <div className={s.block}>
            <span className={s.question}>
                        Question
            </span>
            <span className={s.answer}>
               Answer
                    </span>
            <span className={s.lastUpdated}>
                Last Updated
                    </span>
            <span className={s.grade}>
             Grade
                    </span>
            <span className={s.action}>
                      Action
                    </span>
        </div>
    )
}