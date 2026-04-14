// lib/api.ts

import axios from "axios";
import { Note } from "@/types/note";

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
});

// ✅ LIST NOTES
export const fetchNotes = async (): Promise<Note[]> => {
    const res = await api.get("/notes");
    return res.data.notes; // 👈 ВАЖЛИВО
};

// ✅ NOTE BY ID
export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
};