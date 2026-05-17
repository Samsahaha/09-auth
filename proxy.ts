import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authRoutes = ['/sign-in', '/sign-up'];

function isPrivatePath(pathname: string) {
  return pathname.startsWith('/profile') || pathname.startsWith('/notes');
}

function isAuthRoute(pathname: string) {
  return authRoutes.includes(pathname);
}

function buildCookieHeader(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let hasSession = Boolean(accessToken);
  const response = NextResponse.next();

  if (!hasSession && refreshToken) {
    try {
      const sessionUrl = new URL('/api/auth/session', request.nextUrl.origin).toString();
      const sessionRes = await fetch(sessionUrl, {
        method: 'GET',
        headers: {
          cookie: buildCookieHeader(cookieStore),
        },
        cache: 'no-store',
      });

      const setCookieHeaders = sessionRes.headers.getSetCookie?.() ?? [];
      for (const cookie of setCookieHeaders) {
        response.headers.append('Set-Cookie', cookie);
      }

      let success = false;
      try {
        const body = (await sessionRes.json()) as { success?: boolean };
        success = Boolean(body.success);
      } catch {
        success = false;
      }

      hasSession = success;
    } catch {
      hasSession = false;
    }
  }

  if (pathname === '/notes') {
    return NextResponse.redirect(new URL('/notes/filter/all', request.url));
  }

  if (isPrivatePath(pathname) && !hasSession) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (hasSession && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/profile',
    '/profile/:path*',
    '/notes',
    '/notes/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
