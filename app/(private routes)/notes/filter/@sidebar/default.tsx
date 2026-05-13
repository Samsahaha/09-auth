import Link from 'next/link';

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
      <Link href="/notes/filter/all" style={{ fontSize: 14, color: '#0d6efd' }}>
        All
      </Link>
      <Link href="/notes/filter/work" style={{ fontSize: 14, color: '#0d6efd' }}>
        work
      </Link>
      <Link href="/notes/filter/personal" style={{ fontSize: 14, color: '#0d6efd' }}>
        personal
      </Link>
      <Link href="/notes/filter/ideas" style={{ fontSize: 14, color: '#0d6efd' }}>
        ideas
      </Link>
    </nav>
  );
}
