import React, {useEffect, useState} from 'react';
import s from './Pagination.module.css'

type PaginatorPropsType = {
    totalCount: number
    pageCount: number
    callback: () => void
}

export const Paginator: React.FC<PaginatorPropsType> =
    React.memo(({
                    totalCount,
                    pageCount,
                    callback,
                }) => {
        const [currentPage, setCurrentPage] = useState(1)
        const totalPages = Math.ceil(totalCount / pageCount)
        const pages = [] as number[]

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

        useEffect(() => {
            callback()
        }, [currentPage])

        return (
            <div>
                <div className={s.pages}>
                    <span onClick={toFirstPage}> {'<<'} </span>
                    <span onClick={() => setCurrentPage(currentPage - 1)}>{'<'} </span>
                    {pages.map((page, index) => <span
                        key={index}
                        className={currentPage === page ? s.currentPage : s.page}
                        onClick={() => setCurrentPage(page)}>{page} </span>)}
                    <span onClick={() => setCurrentPage(currentPage + 1)}> {'>'} </span>
                    <span onClick={toLastPage}>{'>>'} </span>
                </div>
            </div>
        );
    });