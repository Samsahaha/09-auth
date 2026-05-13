import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesListView from '@/components/NotesListView/NotesListView';

export const metadata: Metadata = {
  title: 'Notes | Notehub',
  description: 'Your private notes in Notehub.',
  robots: { index: false, follow: false },
};

export default async function NotesPage() {
  const notes = await fetchNotes({ page: 1, perPage: 12 });
  return <NotesListView notes={notes} />;
}
