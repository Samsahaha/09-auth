import type { Metadata } from 'next';
import CreateNoteForm from '@/components/CreateNoteForm/CreateNoteForm';

export const metadata: Metadata = {
  title: 'Create note | Notehub',
  robots: { index: false, follow: false },
};

export default function CreateNotePage() {
  return (
    <main style={{ paddingTop: 16, paddingBottom: 32 }}>
      <CreateNoteForm />
    </main>
  );
}
