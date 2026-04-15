"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // debounce (тільки для API)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // search handler (UX trigger)
    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
        setHasSearched(true);
    };

    // query (тільки після реального пошуку)
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", debouncedSearch, page],
        queryFn: () => fetchNotes(debouncedSearch, page),
        placeholderData: keepPreviousData,
        enabled: hasSearched,
    });

    return (
        <div className={css.app}>
            {/* TOOLBAR (завжди видно) */}
            <div className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearch} />

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note
                </button>
            </div>

            {/* BEFORE SEARCH */}
            {!hasSearched && (
                <p>Enter search to load notes</p>
            )}

            {/* AFTER SEARCH */}
            {hasSearched && (
                <>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error loading notes</p>}

                    {data && (
                        <>
                            <NoteList notes={data.notes} />

                            {data.totalPages > 1 && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={data.totalPages}
                                    onPageChange={setPage}
                                />
                            )}
                        </>
                    )}
                </>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}