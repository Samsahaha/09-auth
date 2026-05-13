import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NotesListView.module.css';

type NotesListViewProps = {
  notes: Note[];
};

export default function NotesListView({ notes }: NotesListViewProps) {
  return (
    <div className={css.wrap}>
      <h1 className={css.title}>Notes</h1>
      <div className={css.toolbar}>
        <Link href="/notes/action/create">Create note</Link>
        <Link href="/notes/filter/all">Filter by tag</Link>
      </div>
      {notes.length === 0 ? (
        <p className={css.empty}>No notes yet.</p>
      ) : (
        <div className={css.grid}>
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className={css.card}
              scroll={false}
            >
              <h2 className={css.cardTitle}>{note.title}</h2>
              <div className={css.cardTag}>{note.tag}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
