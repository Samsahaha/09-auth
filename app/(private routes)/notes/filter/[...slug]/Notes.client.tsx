'use client';

import { useEffect } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useNoteStore } from '@/lib/store/noteStore';
import type { Note } from '@/types/note';

type NotesClientProps = {
  notes: Note[];
  page: number;
  hasNext: boolean;
  search: string;
  filterPath: string;
};

export default function NotesClient({
  notes,
  page,
  hasNext,
  search,
  filterPath,
}: NotesClientProps) {
  const setNotes = useNoteStore((s) => s.setNotes);

  useEffect(() => {
    setNotes(notes);
  }, [notes, setNotes]);

  return (
    <div style={{ paddingBottom: 24 }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '1.75rem' }}>Notes</h1>
      <div style={{ marginBottom: 16 }}>
        <SearchBox action={filterPath} defaultSearch={search} />
      </div>
      <NoteList notes={notes} />
      <Pagination page={page} hasNext={hasNext} search={search} />
    </div>
  );
}
