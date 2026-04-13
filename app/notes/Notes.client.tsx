"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Link from "next/link";

export default function NotesClient() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes"],
        queryFn: () => fetchNotes(),
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Could not fetch notes</p>;

    return (
        <div>
            {data?.map((note) => (
                <div key={note.id}>
                    <h3>{note.title}</h3>
                    <Link href={`/notes/${note.id}`}>View details</Link>
                </div>
            ))}
        </div>
    );
}