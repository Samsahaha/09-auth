'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import NoteDetailView from '@/components/NoteDetailView/NoteDetailView';
import { fetchNoteById } from '@/lib/api/clientApi';
import { noteDetailKey } from '@/lib/queryKeys';

export default function NotePreviewClient() {
  const params = useParams<{ id?: string }>();
  const id = String(params.id ?? '');

  const query = useQuery({
    queryKey: noteDetailKey(id),
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });

  return (
    <Modal>
      {query.isPending ? <p style={{ color: '#64748b' }}>Loading note…</p> : null}
      {query.isError ? (
        <p style={{ color: '#b91c1c' }}>{(query.error as Error)?.message ?? 'Failed to load note.'}</p>
      ) : null}
      {query.data ? <NoteDetailView note={query.data} /> : null}
    </Modal>
  );
}
