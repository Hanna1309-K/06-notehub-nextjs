export type Tag = "Work" | "Personal" | "Ideas";

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
}