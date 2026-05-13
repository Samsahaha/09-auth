import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import type { Note } from '@/types/note';
import { noteDetailKey } from '@/lib/queryKeys';

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
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: noteDetailKey(id),
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
