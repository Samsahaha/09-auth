'use client';

import { useRouter } from 'next/navigation';
import css from './InterceptedModal.module.css';

type InterceptedModalProps = {
  children: React.ReactNode;
};

export default function InterceptedModal({ children }: InterceptedModalProps) {
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
