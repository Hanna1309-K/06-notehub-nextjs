"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Error loading note</p>;
    if (!data) return null;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
        </div>
    );
}