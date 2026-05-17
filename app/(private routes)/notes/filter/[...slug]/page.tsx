import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { tagFromFilterSlug } from '@/lib/constants/noteTags';
import { fetchNotes } from '@/lib/api/serverApi';
import { NOTES_PER_PAGE, notesListKey } from '@/lib/queryKeys';

export const metadata: Metadata = {
  title: 'Notes | Notehub',
  description: 'Your private notes in Notehub.',
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function NotesFilterSlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const raw = slug[0] ?? 'all';
  const tag = tagFromFilterSlug(raw);
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const search = typeof sp.search === 'string' ? sp.search : '';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: notesListKey(tag, search, page),
    queryFn: () => fetchNotes({ page, perPage: NOTES_PER_PAGE, tag, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
