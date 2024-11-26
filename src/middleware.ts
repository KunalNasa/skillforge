import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/', '/profile'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith('/login') || url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/profile'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}