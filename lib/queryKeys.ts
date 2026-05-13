export const notesListKey = (tag: string, search: string, page: number) =>
  ['notes', { tag, search, page }] as const;

export const noteDetailKey = (id: string) => ['note', id] as const;
