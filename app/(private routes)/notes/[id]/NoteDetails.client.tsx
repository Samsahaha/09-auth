'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteNote, fetchNoteById } from '@/lib/api/clientApi';
import NoteDetailView from '@/components/NoteDetailView/NoteDetailView';
import { noteDetailKey } from '@/lib/queryKeys';

type NoteDetailsClientProps = {
  id: string;
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deleteError, setDeleteError] = useState('');

  const query = useQuery({
    queryKey: noteDetailKey(id),
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.removeQueries({ queryKey: noteDetailKey(id) });
      router.push('/notes');
      router.refresh();
    },
    onError: () => setDeleteError('Could not delete the note.'),
  });

  return (
    <div style={{ padding: '24px', maxWidth: 720, margin: '0 auto' }}>
      <p style={{ marginBottom: 16 }}>
        <Link href="/notes" style={{ color: '#0d6efd' }}>
          ← Back to notes
        </Link>
      </p>
      {query.isPending ? <p style={{ color: '#64748b' }}>Loading note…</p> : null}
      {query.isError ? (
        <p style={{ color: '#b91c1c' }}>{(query.error as Error)?.message ?? 'Failed to load note.'}</p>
      ) : null}
      {query.data ? (
        <>
          <NoteDetailView note={query.data} />
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                if (!window.confirm('Delete this note?')) return;
                setDeleteError('');
                deleteMutation.mutate();
              }}
              disabled={deleteMutation.isPending}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid #fecaca',
                background: '#fef2f2',
                color: '#b91c1c',
                cursor: deleteMutation.isPending ? 'not-allowed' : 'pointer',
              }}
            >
              {deleteMutation.isPending ? 'Deleting…' : 'Delete note'}
            </button>
          </div>
          {deleteError ? (
            <p style={{ color: '#b91c1c', marginTop: 12, fontSize: 14 }}>{deleteError}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
