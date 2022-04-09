import React, {FC} from "react";
import s from './GridCards.module.css'

type PropsType = {
    question: string
    answer: string
    lastUpdated: string
    grade: string | number
}


export const GridCards: FC<PropsType> = ({
                                             lastUpdated, question, answer,
                                             grade
                                         }) => {
    return (
        <div className={s.block}>
            <span className={s.question}>
                        {question}
            </span>
            <span className={s.answer}>
                        {answer}
                    </span>
            <span className={s.lastUpdated}>
                        {lastUpdated}
                    </span>
            <span className={s.grade}>
                        {grade}
                    </span>
        </div>
    )
}