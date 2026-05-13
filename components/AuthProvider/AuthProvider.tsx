'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkSession, getMe, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '@/components/Loader/Loader';

type AuthProviderProps = {
  children: React.ReactNode;
};

function isPrivatePath(pathname: string) {
  return pathname.startsWith('/profile') || pathname.startsWith('/notes');
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);
  const isPrivate = isPrivatePath(pathname);
  const [validatedForPath, setValidatedForPath] = useState<string | null>(null);

  const privateReady = !isPrivate || validatedForPath === pathname;

  useEffect(() => {
    if (!isPrivate) {
      queueMicrotask(() => setValidatedForPath(null));
      return;
    }

    if (validatedForPath === pathname) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const ok = await checkSession();
        if (cancelled) return;
        if (!ok) {
          try {
            await logout();
          } catch {
            /* ignore */
          }
          clearIsAuthenticated();
          router.replace('/sign-in');
          return;
        }
        const user = await getMe();
        if (cancelled) return;
        setUser(user);
        setValidatedForPath(pathname);
      } catch {
        if (cancelled) return;
        try {
          await logout();
        } catch {
          /* ignore */
        }
        clearIsAuthenticated();
        router.replace('/sign-in');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isPrivate, pathname, validatedForPath, clearIsAuthenticated, router, setUser]);

  if (isPrivate && !privateReady) {
    return <Loader />;
  }

  return <>{children}</>;
}
