import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {formatDate} from "f1-main/m4-utils/formatDate";
import {useDispatch} from "react-redux";
import {removeCardTC, setCardsTC, updateGradeAC} from "../../f1-main/m2-store/reducers/cardsReducer";
import {useAppSelector} from "../../f1-main/m2-store/store";
import SuperButton from "../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import {Modal} from "../../f1-main/m1-ui/u3-common/c4-modal/Modal";
import {Card} from "./card/Card";
import {CardsUpdateForm} from "./CardsUpdateForm/CardsUpdateForm";
import {useLocation} from "react-router-dom";
import {HeaderCard} from "./card/HeaderCards";


export const Cards: FC = () => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch();
    const cards = useAppSelector(state => state.cards.cards)
    // const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const location = useLocation()

    // @ts-ignore
    const { packId, packName } = location.state;

    console.log(location.state)
    const updateRating = useCallback((rating: number, id: string) => {
        dispatch(updateGradeAC(rating, id))
    }, [])

    const removeCard = (packId: string, cardId: string) => {
        dispatch(removeCardTC(packId, cardId))
    }

    const newCards = useMemo(() => {
        return cards.map(t => <Card key={t._id}
                                    question={t.question} answer={t.answer}
                                    lastUpdated={formatDate(t.updated)} grade={t.grade}
                                    updateRating={(rating) => updateRating(rating, t._id)}
                                    removeCard={() => removeCard(packId, t._id)} cardId={t._id}
                                    cardsPack_id={packId}
            />
        )
    }, [cards])




    useEffect(() => {
        dispatch(setCardsTC(packId))
    }, [sortCards])

    return (
        <div>
            <h1>{packName}</h1>
            <div>
                <SuperButton onClick={() => {
                    setEditMode(true)
                }}>Add card</SuperButton>
                <Modal editMode={editMode} setEditMode={setEditMode}>
                    <CardsUpdateForm setEditMode={setEditMode} cardsPack_id={packId}/>
                </Modal>
            </div>
            <div>
                <HeaderCard/>
                {newCards}
            </div>
        </div>
    );
};

