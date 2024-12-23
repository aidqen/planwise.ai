import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl, cookies } = request;
    
  // Example: Check for an auth token in cookies
  const authToken = cookies.get("next-auth.session-token");

  // Allow public routes like `/` and `/auth`
  if (nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the auth page
  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|static|public|auth).*)", // Protect all routes except `/`, `/auth`, and assets
  ],
};