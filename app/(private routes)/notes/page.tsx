import type { Metadata } from 'next';
import Link from 'next/link';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/serverApi';

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
  const notes = await fetchNotes({ page, perPage: 12, search });

  return (
    <div style={{ padding: '24px', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '1.75rem' }}>Notes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <Link href="/notes/action/create" style={{ fontSize: 14, color: '#0d6efd' }}>
          Create note
        </Link>
        <Link href="/notes/filter/all" style={{ fontSize: 14, color: '#0d6efd' }}>
          Filter by tag
        </Link>
      </div>
      <div style={{ marginBottom: 16 }}>
        <SearchBox action="/notes" defaultSearch={search} />
      </div>
      <NoteList notes={notes} />
      <Pagination page={page} hasNext={notes.length === 12} search={search} />
    </div>
  );
}
