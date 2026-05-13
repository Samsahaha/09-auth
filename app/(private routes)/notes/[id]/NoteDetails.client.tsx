'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteNote } from '@/lib/api/clientApi';
import { useNoteStore } from '@/lib/store/noteStore';
import type { Note } from '@/types/note';
import NoteDetailView from '@/components/NoteDetailView/NoteDetailView';

type NoteDetailsClientProps = {
  note: Note;
};

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  const router = useRouter();
  const removeNoteById = useNoteStore((s) => s.removeNoteById);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (!window.confirm('Delete this note?')) return;
    setError('');
    setPending(true);
    try {
      await deleteNote(note.id);
      removeNoteById(note.id);
      router.push('/notes');
      router.refresh();
    } catch {
      setError('Could not delete the note.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: 720, margin: '0 auto' }}>
      <p style={{ marginBottom: 16 }}>
        <Link href="/notes" style={{ color: '#0d6efd' }}>
          ← Back to notes
        </Link>
      </p>
      <NoteDetailView note={note} />
      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #fecaca',
            background: '#fef2f2',
            color: '#b91c1c',
            cursor: pending ? 'not-allowed' : 'pointer',
          }}
        >
          {pending ? 'Deleting…' : 'Delete note'}
        </button>
      </div>
      {error ? (
        <p style={{ color: '#b91c1c', marginTop: 12, fontSize: 14 }}>{error}</p>
      ) : null}
    </div>
  );
}
