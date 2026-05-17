import { create } from 'zustand';
import { NOTE_API_TAGS } from '@/lib/constants/noteTags';

const initial = {
  title: '',
  content: '',
  tag: NOTE_API_TAGS[0],
};

type NoteDraftStore = {
  title: string;
  content: string;
  tag: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTag: (tag: string) => void;
  resetDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
  ...initial,
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setTag: (tag) => set({ tag }),
  resetDraft: () => set(initial),
}));

export const NOTE_TAG_OPTIONS = NOTE_API_TAGS;
