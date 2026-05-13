/** Must match `perPage` sent to GET /notes and the homework API contract. */
export const NOTES_PER_PAGE = 12;

/**
 * React Query key for the notes list: string scope, search query, tag, page.
 * Order: `['notes', search, tag, page]`.
 */
export function notesListKey(tag: string, search: string, page: number) {
  return ['notes', search, tag, page] as const;
}

/**
 * True when the current page is "full", so another page may exist.
 * The last page typically has fewer than {@link NOTES_PER_PAGE} items; then this is false.
 */
export function notesListHasNextPage(notes: readonly unknown[]): boolean {
  return notes.length === NOTES_PER_PAGE;
}

export const noteDetailKey = (id: string) => ['note', id] as const;
