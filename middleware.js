
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('accessToken');
  const protectedRoutes = ['/plans','/projects'];
  const unProtectedRoutes = ['/login', '/sign-up','/email-confirmed', '/forgot-password'];

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && unProtectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/redirect', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/sign-up','/email-confirmed', '/forgot-password','/plans', '/profile','/projects'],
};
