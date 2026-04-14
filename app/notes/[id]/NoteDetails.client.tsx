"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
    const params = useParams();
    const id = params.id as string;

    const { data, error, isPending } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
    });

    if (isPending) return <p>Loading, please wait...</p>;
    if (error || !data) return <p>Something went wrong.</p>;

    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.tag}</p>
            <p>{data.content}</p>
            <p>{data.createdAt}</p>
        </div>
    );
}