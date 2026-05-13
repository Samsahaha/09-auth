import type { Note } from '@/types/note';
import css from './NoteDetailView.module.css';

type NoteDetailViewProps = {
  note: Note;
};

export default function NoteDetailView({ note }: NoteDetailViewProps) {
  return (
    <article>
      <h2 className={css.title}>{note.title}</h2>
      <span className={css.tag}>{note.tag}</span>
      <p className={css.content}>{note.content}</p>
    </article>
  );
}
