'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout as logoutRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  async function handleLogout() {
    try {
      await logoutRequest();
    } finally {
      clearIsAuthenticated();
      router.replace('/sign-in');
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email ?? 'User email'}</p>
            <button type="button" className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
