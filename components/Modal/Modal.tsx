"use client";

import css from "./Modal.module.css";

interface Props {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: Props) {
    return (
        <div className={css.backdrop} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}