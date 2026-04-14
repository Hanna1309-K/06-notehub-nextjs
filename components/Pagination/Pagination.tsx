"use client";

import css from "./Pagination.module.css";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={css.pagination}>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? css.active : ""}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}