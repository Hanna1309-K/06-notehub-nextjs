"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";

type Tag = "Work" | "Personal" | "Todo" | "Meeting" | "Shopping";

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

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tag: Yup.string().required("Tag is required"),
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
                    {/* TITLE */}
                    <div className={css.formGroup}>
                        <label>Title</label>
                        <Field name="title" className={css.input} />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className={css.error}
                        />
                    </div>

                    {/* CONTENT */}
                    <div className={css.formGroup}>
                        <label>Content</label>
                        <Field
                            as="textarea"
                            name="content"
                            className={css.textarea}
                        />
                        <ErrorMessage
                            name="content"
                            component="div"
                            className={css.error}
                        />
                    </div>

                    {/* TAG */}
                    <div className={css.formGroup}>
                        <label>Tag</label>
                        <Field as="select" name="tag" className={css.select}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Todo">Todo</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <ErrorMessage
                            name="tag"
                            component="div"
                            className={css.error}
                        />
                    </div>

                    {/* ACTIONS */}
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