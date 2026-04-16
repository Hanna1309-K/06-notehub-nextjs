"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { Tag } from "@/types/note";

interface NoteFormProps {
    onClose: () => void;
}

interface FormValues {
    title: string;
    content: string;
    tag: Tag;
}

const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Work",
};

const tagOptions = ["Work", "Personal", "Todo", "Meeting", "Shopping"] as const;

const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must be at most 50 characters")
        .required("Title is required"),

    content: Yup.string()
        .max(500, "Content must be at most 500 characters")
        .notRequired(),

    tag: Yup.mixed<Tag>()
        .oneOf(tagOptions)
        .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        },
    });

    const handleSubmit = (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        mutation.mutate(values);
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" className={css.input} />
                        <ErrorMessage name="title" component="div" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            as="textarea"
                            id="content"
                            name="content"
                            className={css.textarea}
                        />
                        <ErrorMessage name="content" component="div" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field as="select" id="tag" name="tag" className={css.select}>
                            {tagOptions.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="tag" component="div" className={css.error} />
                    </div>

                    <div className={css.actions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={css.cancelButton}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting || mutation.isPending}
                            className={css.submitButton}
                        >
                            Create note
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}