import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes | Notehub',
  description: 'Your private notes in Notehub.',
  robots: { index: false, follow: false },
};

export default function NotesPage() {
  return (
    <main style={{ padding: '32px', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 16 }}>Notes</h1>
      <p style={{ color: '#555' }}>
        This route is protected. Extend this page with your notes list using{' '}
        <code>fetchNotes</code> from <code>lib/api</code> when you continue the Notehub
        flow.
      </p>
    </main>
  );
}
