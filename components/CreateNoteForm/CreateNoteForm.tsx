'use client';

import { isAxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/clientApi';
import css from './CreateNoteForm.module.css';

export default function CreateNoteForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = String(formData.get('tag') ?? '').trim();

    if (!title || !content || !tag) {
      setError('All fields are required.');
      return;
    }

    setPending(true);
    try {
      const note = await createNote({ title, content, tag });
      router.push(`/notes/${note.id}`);
      router.refresh();
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          (err.response?.data as { error?: string })?.error ?? err.message ?? 'Failed';
        setError(String(message));
      } else {
        setError('Failed to create note');
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.title}>Create note</h1>

      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className={css.input} required />
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" className={css.textarea} required />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <input id="tag" name="tag" className={css.input} required />
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submit} disabled={pending}>
          Save
        </button>
        <button
          type="button"
          className={css.cancel}
          onClick={() => router.push('/notes')}
          disabled={pending}
        >
          Cancel
        </button>
      </div>

      {error ? <p className={css.error}>{error}</p> : null}
    </form>
  );
}
