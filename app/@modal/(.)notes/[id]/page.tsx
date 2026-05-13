import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import { noteDetailKey } from '@/lib/queryKeys';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedNoteModalPage({ params }: PageProps) {
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
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
