// lib/api.ts

import axios from "axios";
import { Note } from "@/types/note";

export interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
});

export const fetchNotes = async (
    search: string = "",
    page: number = 1
): Promise<NotesResponse> => {
    const res = await api.get<NotesResponse>("/notes", {
        params: { search, page },
    });

    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
};

export const createNote = async (
    data: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
    const res = await api.post<Note>("/notes", data);
    return res.data;
};

export const deleteNote = async (id: string) => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
};