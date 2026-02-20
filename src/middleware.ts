import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access to login page without auth
                if (req.nextUrl.pathname === '/admin/login') {
                    return true;
                }
                // All other /admin routes require auth
                return !!token;
            },
        },
        pages: {
            signIn: '/admin/login',
        },
    }
);

export const config = {
    matcher: ['/admin/:path*'],
};
