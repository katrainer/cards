import React, {ChangeEvent, useState} from 'react';
import s from './Pagination.module.css'
import {useDispatch} from "react-redux";
import SuperSelect from "../SuperSelect";
import SuperButton from "../c2-SuperButton/SuperButton";

export const Pagination = () => {
    const dispatch = useDispatch()
    const totalCount = 1000
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const pagesCount = Math.ceil(totalCount / perPage)
    const perPage1 = [5,10,15,20] as number[]
    const pages = [] as number[]
    const allPages = [] as number[]

    for (let i = 1; i <= pagesCount; i++) {
        allPages.push(i)
    }

    function createPages(pages: number[], pagesCount: number, currentPage: number) {
        if (pagesCount > 10) {
            if (currentPage > 5) {
                for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                    pages.push(i)
                    if (i === pagesCount) break
                }
            } else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i)
                    if (i === pagesCount) break
                }
            }
        } else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }

    createPages(pages, pagesCount, currentPage)

    return (
        <div>
            <div className={s.pages}>
                <SuperButton onClick={()=>setCurrentPage(1)}>1</SuperButton>
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage === page ? s.currentPage : s.page}
                    onClick={() => setCurrentPage(page)}>{page} </span>)}
                <span className={s.selectPage}>Show
                    <SuperSelect value={perPage} options={perPage1} onChange={(e) => {
                        setPerPage(+e.currentTarget.value)
                }}>{currentPage}</SuperSelect> Cards per Page</span>
            </div>
        </div>
    );
};