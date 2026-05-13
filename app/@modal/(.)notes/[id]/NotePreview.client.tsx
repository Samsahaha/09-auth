'use client';

import NoteDetailView from '@/components/NoteDetailView/NoteDetailView';
import type { Note } from '@/types/note';

type NotePreviewClientProps = {
  note: Note;
};

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  return <NoteDetailView note={note} />;
}
