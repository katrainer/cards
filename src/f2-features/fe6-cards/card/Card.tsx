import React, {FC, useState} from "react";
import s from './Card.module.css'
import {StarRating} from "f1-main/m1-ui/u3-common/c9-starRating/StarRating";
import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import {Modal} from "f1-main/m1-ui/u3-common/c4-modal/Modal";
import {CardUpdateForm} from "./CardUpdateForm/CardUpdateForm";

type PropsType = {
    question: string
    answer: string
    lastUpdated: string
    grade: number
    updateRating: (rating: number) => void
    removeCard: () => void
    cardId: string
    cardsPack_id: string
}


export const Card: FC<PropsType> = ({
                                        lastUpdated, question, answer,
                                        grade, updateRating, cardId, removeCard,cardsPack_id
                                    }) => {
    const [editMode, setEditMode] = useState(false)

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
                <StarRating rating={grade} callback={updateRating}/>
                    </span>
            <span className={s.action}>
                        <div>
                            <SuperButton onClick={() => {
                                setEditMode(true)
                            }}>Edit</SuperButton>
                            <SuperButton onClick={removeCard}>Del</SuperButton>
                            <Modal editMode={editMode} setEditMode={setEditMode}>
                                <CardUpdateForm setEditMode={setEditMode} cardId={cardId} cardsPack_id={cardsPack_id}/>
                            </Modal>
                        </div>
                    </span>
        </div>
    )
}