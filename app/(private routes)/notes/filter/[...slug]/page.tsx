import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function NotesFilterSlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const raw = slug[0] ?? 'all';
  const tag = raw.toLowerCase() === 'all' ? '' : raw;
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const search = typeof sp.search === 'string' ? sp.search : '';
  const notes = await fetchNotes({ page, perPage: 12, tag, search });
  const filterPath = `/notes/filter/${slug.join('/')}`;

  return (
    <NotesClient
      notes={notes}
      page={page}
      hasNext={notes.length === 12}
      search={search}
      filterPath={filterPath}
    />
  );
}
