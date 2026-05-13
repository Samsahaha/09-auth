import NotesListView from '@/components/NotesListView/NotesListView';
import { fetchNotes } from '@/lib/api/serverApi';

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesFilterSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const raw = slug[0] ?? 'all';
  const tag = raw.toLowerCase() === 'all' ? '' : raw;
  const notes = await fetchNotes({ page: 1, perPage: 12, tag });
  return <NotesListView notes={notes} />;
}
