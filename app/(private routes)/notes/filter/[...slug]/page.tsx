import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
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
    <div style={{ paddingBottom: 24 }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '1.75rem' }}>Notes</h1>
      <div style={{ marginBottom: 16 }}>
        <SearchBox action={filterPath} defaultSearch={search} />
      </div>
      <NoteList notes={notes} />
      <Pagination page={page} hasNext={notes.length === 12} search={search} />
    </div>
  );
}
