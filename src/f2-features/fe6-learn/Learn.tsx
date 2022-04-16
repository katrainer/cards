import React, {useEffect, useState} from 'react';
import {Modal} from "../../f1-main/m1-ui/u3-common/c4-modal/Modal";
import SuperButton from "../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import {CardsType} from "../../f1-main/m3-API/apiCards";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../f1-main/m2-store/store";
import {useParams} from "react-router-dom";
import {setCardsTC} from "../../f1-main/m2-store/reducers/cardsReducer";

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

type IdType = {
    id: string
    packName: string
}

export const Learn = () => {
    const {id, packName} = useParams() as IdType
    const dispatch = useDispatch();
    const cards = useAppSelector(state => state.cards.cards)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardsType>({
            answer: '1',
            question: '2',
            cardsPack_id: '',
            grade: 0,
            shots: 0,
            user_id: '',
            created: '',
            updated: '',
            _id: '',
        }
    );
    console.log(id)

    useEffect(() => {

        if (first) {
            dispatch(setCardsTC(id));
            setFirst(false);
        }
    }, [id, cards, first]);

    const onNext = () => {
        setEditMode(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }
    return (
        <div >
            {/*<SuperButton onClick={()=> {setEditMode(true)}}>start</SuperButton>*/}
                <div>
                    {packName}

                    <div>{card.question}</div>
                    <div>
                        <SuperButton onClick={() => setEditMode(!isChecked)}>check</SuperButton>
                    </div>

            <Modal editMode={editMode} setEditMode={setEditMode}>
                        <>
                            <div>{card.answer}</div>

                            {grades.map((g, i) => (
                                <SuperButton key={'grade-' + i} onClick={() => {
                                    console.log(i+1) }}>{g}</SuperButton>
                            ))}

                            <div><SuperButton onClick={onNext}>next</SuperButton></div>
                        </>
            </Modal>
                </div>
        </div>
    );
};
