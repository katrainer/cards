import React from 'react';
import SuperInputText from "../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText";
import {Pagination} from "../../f1-main/m1-ui/u3-common/pagination/Pagination";
import {GridCards} from "./GridCards";

export const Card = () => {
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
const formatDate = (dates: string) => {
    const date1 = new Date(dates);
    let date = date1.getDate();
    if (date < 10) date = Number('0' + date);
    let month = date1.getMonth();
    if (month < 10) month = Number('0' + month);
    let year = date1.getFullYear();
    let result = date + '.' + month + '.' + year;
    return result
}

    console.log(formatDate("2020-05-13T11:05:44.867Z"))


    const newCards = resCards.cards.map(t=> <GridCards
    question={t.question} answer={t.answer} lastUpdated={formatDate(t.updated)} grade={t.grade}/>)
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
            <Pagination/>
        </div>
    );
};
