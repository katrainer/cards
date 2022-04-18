import React, {useEffect, useState} from 'react';
import {Modal} from "../../f1-main/m1-ui/u3-common/c4-modal/ModalCard";
import SuperButton from "../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import {CardsType, GradeType} from "../../f1-main/m3-API/apiCards";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../f1-main/m2-store/store";
import {useParams} from "react-router-dom";
import {setCardsTC, updateGradeCardTC} from "../../f1-main/m2-store/reducers/cardsReducer";

const grades = ['совсем не знаю', 'не знаю', 'почти вспомнил', 'неуверенно знаю', 'знаю'];

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
            answer: '',
            question: '',
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

    const onUpdateClick = (grade: GradeType, cardId: string) => {
        dispatch(updateGradeCardTC(grade, cardId))
    }

    const onNext = () => {
        setEditMode(false);

        if (cards.length > 0) {
            // dispatch
            setTimeout(() => setCard(getCard(cards)), 500);
        } else {

        }
    }
    return (
        <div>
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
                                onUpdateClick((i + 1) as GradeType, card._id)
                            }}>{g}</SuperButton>
                        ))}
                        <div><SuperButton onClick={onNext}>next</SuperButton></div>
                    </>
                </Modal>
            </div>
        </div>
    );
};
