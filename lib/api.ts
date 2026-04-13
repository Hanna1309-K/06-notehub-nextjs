import axios from "axios";
import { Note } from "@/types/note";

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
});

export const fetchNotes = async (search: string = ""): Promise<Note[]> => {
    const { data } = await api.get("/notes", {
        params: { search },
    });

    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await api.get(`/notes/${id}`);
    return data;
};