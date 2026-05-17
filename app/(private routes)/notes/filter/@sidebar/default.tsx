import Link from 'next/link';
import {
  NOTE_FILTER_SIDEBAR_TAGS,
  filterPathForTag,
} from '@/lib/constants/noteTags';

export default function FilterSidebarDefault() {
  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        background: '#fff',
      }}
    >
      <strong style={{ fontSize: 14 }}>Tags</strong>
      <Link href={filterPathForTag('')} style={{ fontSize: 14, color: '#0d6efd' }}>
        All
      </Link>
      {NOTE_FILTER_SIDEBAR_TAGS.map((tag) => (
        <Link key={tag} href={filterPathForTag(tag)} style={{ fontSize: 14, color: '#0d6efd' }}>
          {tag}
        </Link>
      ))}
    </nav>
  );
}
