import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './filter/[...slug]/Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import { NOTES_PER_PAGE, notesListKey } from '@/lib/queryKeys';

export const metadata: Metadata = {
  title: 'Notes | Notehub',
  description: 'Your private notes in Notehub.',
  robots: { index: false, follow: false },
};

type NotesPageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const search = typeof sp.search === 'string' ? sp.search : '';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: notesListKey('', search, page),
    queryFn: () => fetchNotes({ page, perPage: NOTES_PER_PAGE, search, tag: '' }),
  });

  return (
    <div style={{ padding: '24px', maxWidth: 960, margin: '0 auto' }}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag="" />
      </HydrationBoundary>
    </div>
  );
}
