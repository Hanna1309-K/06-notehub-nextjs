import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface Props {
    notes: Note[];
}

export default function NoteList({ notes }: Props) {
    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.item}>
                    <h3 className={css.title}>{note.title}</h3>
                    <p className={css.content}>{note.content}</p>
                </li>
            ))}
        </ul>
    );
}