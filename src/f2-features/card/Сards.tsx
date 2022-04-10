import React from 'react';
import SuperInputText from "../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText";
import {GridCards} from "./GridCards";
import {formatDate} from "f1-main/m4-utils/formatDate";
import {Paginator} from "../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator";

export const Cards = () => {
    const resCards = {
        cards: [
            {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            }, {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                shots: 1,
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                _id: "5ebbd48876810f1ad0e7ece3",
            },
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: "5eecf82a3ed8f700042f1186",
    }


    const newCards = resCards.cards.map((t, i) => <GridCards key={i}
                                                             question={t.question} answer={t.answer}
                                                             lastUpdated={formatDate(t.updated)} grade={t.grade}/>)
    return (
        <div>
            <h1>Pack Name</h1>
            <div>
                <SuperInputText placeholder={'Search'}/>
            </div>
            <div>
                <GridCards question={'Question'} answer={'Answer'} lastUpdated={'Last Updated'} grade={'Grade'}/>
                {newCards}
            </div>
            <Paginator totalCount={100} pageCount={10} callback={()=>{}}/>
        </div>
    );
};
