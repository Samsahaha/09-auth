import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NoteDetailView from '@/components/NoteDetailView/NoteDetailView';
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

  return (
    <div style={{ padding: '24px', maxWidth: 720, margin: '0 auto' }}>
      <p style={{ marginBottom: 16 }}>
        <Link href="/notes" style={{ color: '#0d6efd' }}>
          ← Back to notes
        </Link>
      </p>
      <NoteDetailView note={note} />
    </div>
  );
}
