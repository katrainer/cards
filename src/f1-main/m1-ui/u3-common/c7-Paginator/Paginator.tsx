import React, {useState} from 'react';
import s from './Pagination.module.css'
import SuperButton from '../c2-SuperButton/SuperButton';

type PaginatorPropsType = {
    totalCount: number
    pageCount: number
}

export const Paginator: React.FC<PaginatorPropsType> =
    React.memo(({
                    totalCount,
                    pageCount
                }) => {
        const [currentPage, setCurrentPage] = useState(1)
        const totalPages = Math.ceil(totalCount / pageCount)
        const pages = [] as number[]
        const allPages = [] as number[]

        for (let i = 1; i <= totalPages; i++) {
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

        createPages(pages, totalPages, currentPage)

        const toFirstPage = () => setCurrentPage(1)
        const toLastPage = () => setCurrentPage(totalPages)

        return (
            <div>
                <div className={s.pages}>
                    <SuperButton onClick={toFirstPage}>1</SuperButton>
                    {pages.map((page, index) => <span
                        key={index}
                        className={currentPage === page ? s.currentPage : s.page}
                        onClick={() => setCurrentPage(page)}>{page} </span>)}
                    <SuperButton onClick={toLastPage}>{totalPages}</SuperButton>
                </div>
            </div>
        );
    });