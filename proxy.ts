import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePrefixes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

function isPrivatePath(pathname: string) {
  return privatePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isAuthRoute(pathname: string) {
  return authRoutes.includes(pathname);
}

function hasSessionCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get('accessToken')?.value ||
    request.cookies.get('refreshToken')?.value
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = hasSessionCookie(request);

  if (isPrivatePath(pathname) && !hasSession) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const isPublicEntry = pathname === '/' || isAuthRoute(pathname);
  if (hasSession && isPublicEntry) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
