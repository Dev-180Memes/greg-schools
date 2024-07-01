import React from 'react';
import { PaginationProps } from '@/types/types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button 
                key={i}
                className={`px-4 py-2 border ${currentPage === i ? 'bg-blue-500 text-white' : 'text-gray-700 bg-white'} rounded-mb mx-1`}
                onClick={() => onPageChange(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex justify-center space-x-2 mt-4">
            {pages}
        </div>
    );
};

export default Pagination;