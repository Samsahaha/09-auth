'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { noteDetailKey } from '@/lib/queryKeys';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.removeQueries({ queryKey: noteDetailKey(id) });
    },
  });

  if (notes.length === 0) {
    return <p className={css.empty}>No notes yet.</p>;
  }

  return (
    <div className={css.grid}>
      {notes.map((note) => (
        <div key={note.id} className={css.card}>
          <Link href={`/notes/${note.id}`} className={css.cardTop} scroll={false}>
            <h2 className={css.cardTitle}>{note.title}</h2>
            <div className={css.cardTag}>{note.tag}</div>
            <p className={css.contentPreview}>{note.content}</p>
          </Link>
          <button
            type="button"
            className={css.deleteButton}
            disabled={deleteMutation.isPending}
            onClick={() => {
              if (!window.confirm('Delete this note?')) return;
              deleteMutation.mutate(note.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
