'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) router.back();
      }}
    >
      <div className={css.panel}>
        <button type="button" className={css.close} onClick={() => router.back()}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
