import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create note | Notehub',
  robots: { index: false, follow: false },
};

export default function CreateNotePage() {
  return (
    <main style={{ paddingTop: 16, paddingBottom: 32 }}>
      <NoteForm />
    </main>
  );
}
