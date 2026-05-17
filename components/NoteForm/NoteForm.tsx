'use client';

import { isAxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { NOTES_LIST_PATH } from '@/lib/constants/noteTags';
import { NOTE_TAG_OPTIONS, useNoteDraftStore } from '@/lib/store/noteDraftStore';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const title = useNoteDraftStore((s) => s.title);
  const content = useNoteDraftStore((s) => s.content);
  const tag = useNoteDraftStore((s) => s.tag);
  const setTitle = useNoteDraftStore((s) => s.setTitle);
  const setContent = useNoteDraftStore((s) => s.setContent);
  const setTag = useNoteDraftStore((s) => s.setTag);
  const resetDraft = useNoteDraftStore((s) => s.resetDraft);

  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => createNote({ title: title.trim(), content: content.trim(), tag }),
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      resetDraft();
      router.push(`/notes/${note.id}`);
      router.refresh();
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        const message =
          (err.response?.data as { error?: string })?.error ?? err.message ?? 'Failed';
        setError(String(message));
      } else {
        setError('Failed to create note');
      }
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !content.trim() || !tag) {
      setError('All fields are required.');
      return;
    }
    mutation.mutate();
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.title}>Create note</h1>

      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.input}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        >
          {NOTE_TAG_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submit} disabled={mutation.isPending}>
          Save
        </button>
        <button
          type="button"
          className={css.cancel}
          onClick={() => router.push(NOTES_LIST_PATH)}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
      </div>

      {error ? <p className={css.error}>{error}</p> : null}
    </form>
  );
}
