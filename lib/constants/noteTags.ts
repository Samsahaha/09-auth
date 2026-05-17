/** Tag values accepted by https://notehub-api.goit.study (PascalCase). */
export const NOTE_API_TAGS = [
  'Todo',
  'Work',
  'Personal',
  'Ideas',
  'Shopping',
  'Meeting',
  'Travel',
  'Health',
  'Finance',
  'Important',
] as const;

export type NoteApiTag = (typeof NOTE_API_TAGS)[number];

/** Tags shown in the filter sidebar (subset aligned with the course). */
export const NOTE_FILTER_SIDEBAR_TAGS: readonly NoteApiTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Ideas',
];

export const NOTES_LIST_PATH = '/notes/filter/all';

export function tagFromFilterSlug(slug: string): string {
  if (slug.toLowerCase() === 'all') {
    return '';
  }
  return NOTE_API_TAGS.find((t) => t.toLowerCase() === slug.toLowerCase()) ?? '';
}

export function filterPathForTag(tag: string): string {
  if (!tag) {
    return NOTES_LIST_PATH;
  }
  return `/notes/filter/${tag}`;
}
