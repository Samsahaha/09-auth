'use client';

import css from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={css.panel}>
        <button type="button" className={css.close} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
