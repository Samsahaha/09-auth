import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import type { Note } from '@/types/note';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  let note: Note;
  try {
    note = await fetchNoteById(id);
  } catch {
    return { title: 'Note | Notehub' };
  }
  return {
    title: `${note.title} | Notehub`,
    description: note.content.slice(0, 120),
    robots: { index: false, follow: false },
  };
}

export default async function NoteDetailPage({ params }: PageProps) {
  const { id } = await params;
  let note: Note;

  try {
    note = await fetchNoteById(id);
  } catch {
    notFound();
  }

  return <NoteDetailsClient note={note} />;
}
