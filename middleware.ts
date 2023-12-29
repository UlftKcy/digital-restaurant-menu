import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// The middleware function will only be invoked if the authorized callback returns true.

export default withAuth(function middleware(req) {

  if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
    return NextResponse.rewrite(
      new URL("/auth/signin?message=You are not authorized", req.url)
    );
},
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};