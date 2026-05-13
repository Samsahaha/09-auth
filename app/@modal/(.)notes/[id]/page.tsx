import { notFound } from 'next/navigation';
import InterceptedModal from '@/components/InterceptedModal/InterceptedModal';
import NoteDetailView from '@/components/NoteDetailView/NoteDetailView';
import { fetchNoteById } from '@/lib/api/serverApi';
import type { Note } from '@/types/note';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedNoteModalPage({ params }: PageProps) {
  const { id } = await params;
  let note: Note;

  try {
    note = await fetchNoteById(id);
  } catch {
    notFound();
  }

  return (
    <InterceptedModal>
      <NoteDetailView note={note} />
    </InterceptedModal>
  );
}
