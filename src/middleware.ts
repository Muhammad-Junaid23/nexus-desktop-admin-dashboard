import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Simulate getting user data (replace with real auth logic)
  const user = {
    isAuthenticated: true,
    role: 'admin', // Change to 'user' to test redirect
  };

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!user.isAuthenticated || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
