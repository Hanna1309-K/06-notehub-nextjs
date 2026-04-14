"use client";

import { useState } from "react";
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
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", search, page],
        queryFn: () => fetchNotes(search, page),
        placeholderData: keepPreviousData,
        enabled: search.trim().length > 0, // 👈 ключ
    });

    return (
        <div className={css.app}>

            {/* TOOLBAR завжди */}
            <div className={css.toolbar}>
                <SearchBox value={search} onChange={setSearch} />

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note
                </button>
            </div>

            {/* ДО ПОШУКУ */}
            {search.trim() === "" && (
                <p>Enter search to load notes</p>
            )}

            {/* ПІСЛЯ ПОШУКУ */}
            {isLoading && search && <p>Loading...</p>}

            {error && <p>Error</p>}

            {data && search && (
                <>
                    <NoteList notes={data.notes} />

                    <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                    />
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