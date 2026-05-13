import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        padding: '48px 24px',
        maxWidth: 520,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', marginBottom: 12 }}>Page not found</h1>
      <p style={{ color: '#64748b', marginBottom: 24 }}>
        The page you are looking for does not exist or was moved.
      </p>
      <Link href="/" style={{ color: '#0d6efd', fontWeight: 600 }}>
        Back to home
      </Link>
    </div>
  );
}
