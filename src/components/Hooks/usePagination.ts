import { useState } from "react";

export const usePagination = <T>(
    data: Array<T>,
    _perPage: number = 10,
    _initialPage: number = 0
) => {
    const [currentPage, setCurrentPage] = useState(_initialPage);
    const [perPage, setPerPage] = useState(_perPage || 10);

    const changeCurrentPage = (newPage: number) => setCurrentPage(newPage);
    const changePerPage = (newPerPage: number) => setPerPage(newPerPage);

    return {
        changeCurrentPage,
        changePerPage,
        paginatedData: data.slice(
        (currentPage || 0) * perPage,
        (currentPage || 0) * perPage + perPage
        ),
        totalPages: Math.ceil(data.length / perPage),
        currentPage,
        perPage,
    };
};