'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/clientApi';
import { notesListKey } from '@/lib/queryKeys';

const DEBOUNCE_MS = 400;

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const [page, setPage] = useState(() =>
    Math.max(1, Number(searchParams.get('page') ?? 1) || 1)
  );
  const [searchInput, setSearchInput] = useState(() => searchParams.get('search') ?? '');
  const [debouncedSearch, setDebouncedSearch] = useState(
    () => searchParams.get('search') ?? ''
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchInput), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    setDebouncedSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(Math.max(1, nextPage));
  }, []);

  const {
    data: notes = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: notesListKey(tag, debouncedSearch, page),
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        ...(tag ? { tag } : {}),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      }),
  });

  const isEmpty = !isPending && !isError && notes.length === 0;

  return (
    <div style={{ paddingBottom: 24 }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '1.75rem' }}>Notes</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <Link href="/notes/action/create" style={{ fontSize: 14, color: '#0d6efd' }}>
          Create note
        </Link>
        <Link href="/notes/filter/all" style={{ fontSize: 14, color: '#0d6efd' }}>
          Filter by tag
        </Link>
      </div>
      <div style={{ marginBottom: 16 }}>
        <SearchBox
          value={searchInput}
          onChange={handleSearchChange}
          onSearch={handleSearchSubmit}
        />
      </div>
      {isPending ? <p style={{ color: '#64748b' }}>Loading notes…</p> : null}
      {isError ? (
        <p style={{ color: '#b91c1c', marginBottom: 12 }}>
          {(error as Error)?.message ?? 'Failed to load notes.'}
        </p>
      ) : null}
      {isEmpty ? <p style={{ color: '#64748b' }}>No notes yet.</p> : null}
      {!isPending && !isError && notes.length > 0 ? <NoteList notes={notes} /> : null}
      {!isPending && !isError && notes.length > 0 ? (
        <Pagination
          page={page}
          hasNext={notes.length === 12}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
}
