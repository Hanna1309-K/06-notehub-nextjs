"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
    const params = useParams();
    const id = params?.id as string;

    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Error loading note</p>;
    if (!data) return null;

    return (
        <div>
            <h1>{data.title}</h1>

            <p>{data.content}</p>

            {/* TAG */}
            <p><strong>Tag:</strong> {data.tag}</p>

            {/* CREATED DATE */}
            <p>
                <strong>Created:</strong>{" "}
                {new Date(data.createdAt).toLocaleString()}
            </p>
        </div>
    );
}