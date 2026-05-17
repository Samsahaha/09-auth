import type { Metadata } from 'next';
import Link from 'next/link';
import { NOTES_LIST_PATH } from '@/lib/constants/noteTags';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Notehub.',
};

export default function HomePage() {
  return (
    <div style={{ padding: '32px', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 12 }}>Notehub</h1>
      <p style={{ marginBottom: 24, color: '#444' }}>
        Sign in to manage your profile and notes, or create a new account.
      </p>
      <ul style={{ lineHeight: 1.8 }}>
        <li>
          <a href="/sign-in">Sign in</a>
        </li>
        <li>
          <a href="/sign-up">Sign up</a>
        </li>
        <li>
          <Link href={NOTES_LIST_PATH}>Notes (private)</Link>
        </li>
        <li>
          <Link href="/profile">Profile (private)</Link>
        </li>
      </ul>
    </div>
  );
}
