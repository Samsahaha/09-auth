'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api/clientApi';
import { notesListKey } from '@/lib/queryKeys';

const DEBOUNCE_MS = 400;

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? 1) || 1);
  const urlSearch = searchParams.get('search') ?? '';

  const [inputSearch, setInputSearch] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);

  useEffect(() => {
    queueMicrotask(() => {
      setInputSearch(urlSearch);
      setDebouncedSearch(urlSearch);
    });
  }, [urlSearch]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(inputSearch), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [inputSearch]);

  const { data: notes = [], isPending, isError, error } = useQuery({
    queryKey: notesListKey(tag, debouncedSearch, page),
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        ...(tag ? { tag } : {}),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      }),
  });

  return (
    <div style={{ paddingBottom: 24 }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '1.75rem' }}>Notes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <Link href="/notes/action/create" style={{ fontSize: 14, color: '#0d6efd' }}>
          Create note
        </Link>
        <Link href="/notes/filter/all" style={{ fontSize: 14, color: '#0d6efd' }}>
          Filter by tag
        </Link>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="notes-search" style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>
          Search
        </label>
        <input
          id="notes-search"
          type="search"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Search notes…"
          style={{
            width: '100%',
            maxWidth: 420,
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: 6,
            fontSize: 14,
          }}
        />
      </div>
      {isPending ? <p style={{ color: '#64748b' }}>Loading notes…</p> : null}
      {isError ? (
        <p style={{ color: '#b91c1c', marginBottom: 12 }}>
          {(error as Error)?.message ?? 'Failed to load notes.'}
        </p>
      ) : null}
      {!isPending && !isError ? <NoteList notes={notes} /> : null}
      <Pagination page={page} hasNext={notes.length === 12} search={debouncedSearch} />
    </div>
  );
}
