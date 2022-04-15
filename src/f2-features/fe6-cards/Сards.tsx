import React, {FC, useEffect, useMemo} from 'react';
import {formatDate} from "f1-main/m4-utils/formatDate";
import {useDispatch} from "react-redux";
import {removeCardTC, setCardsTC, updateGradeAC} from "../../f1-main/m2-store/reducers/cardsReducer";
import {useAppSelector} from "../../f1-main/m2-store/store";
import {Card} from "./card/Card";
import {useLocation} from "react-router-dom";
import {AddCard} from "./card/AddCard";
import {TableHeaders} from "./card/TableHeaders";


export const Cards: FC = () => {

    const dispatch = useDispatch();
    const cards = useAppSelector(state => state.cards.cards)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const myId = useAppSelector(state => state.profile.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const location = useLocation()
    // @ts-ignore
    const {packId, packName} = location.state;

    const updateRating = (rating: number, cardId: string) => {
        dispatch(updateGradeAC(rating, cardId))
    }

    const removeCard = (packId: string, cardId: string) => {
        dispatch(removeCardTC(packId, cardId))
    }

    const newCards = useMemo(() => {
        return cards.map(t => <Card key={t._id}
                                    question={t.question} answer={t.answer}
                                    lastUpdated={formatDate(t.updated)} grade={t.grade}
                                    updateRating={(rating) => updateRating(rating, t._id)}
                                    removeCard={() => removeCard(t.cardsPack_id, t._id)} cardId={t._id}
                                    cardsPack_id={t.cardsPack_id} myId={myId} userId={t.user_id}
            />
        )
    }, [cards])

    useEffect(() => {
        dispatch(setCardsTC(packId))
    }, [sortCards])

    return (
        <div>
            <h1>{packName}</h1>
            {
                packUserId === myId
                && <AddCard cardsPack_id={packId} userId={myId}/>
            }
            <div>
                <TableHeaders/>
                {newCards}
            </div>
        </div>
    );
};

