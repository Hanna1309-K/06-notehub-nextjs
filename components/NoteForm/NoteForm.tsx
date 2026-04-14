"use client";

import { useState } from "react";
import css from "./NoteForm.module.css";

interface Props {
    onClose: () => void;
}

export default function NoteForm({ onClose }: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // тут буде createNote
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <input
                className={css.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                className={css.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <button type="submit" className={css.submitButton}>
                Create
            </button>
        </form>
    );
}