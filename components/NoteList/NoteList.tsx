import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p className={css.empty}>No notes yet.</p>;
  }

  return (
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
  );
}
