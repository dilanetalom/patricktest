// src/hooks/usePagination.js
import { useState, useMemo } from 'react';

export const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        goToPage,
    };
};