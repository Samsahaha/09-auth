import { create } from 'zustand';
import type { Note } from '@/types/note';

type NoteStore = {
  notes: Note[];
  activeTag: string;
  searchQuery: string;
  setNotes: (notes: Note[]) => void;
  setActiveTag: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  removeNoteById: (id: string) => void;
};

export const useNoteStore = create<NoteStore>()((set) => ({
  notes: [],
  activeTag: '',
  searchQuery: '',
  setNotes: (notes) => set({ notes }),
  setActiveTag: (activeTag) => set({ activeTag }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  removeNoteById: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),
}));
