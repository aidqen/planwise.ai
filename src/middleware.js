import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl, cookies } = request;

  const authToken =
    cookies.get("next-auth.session-token") ||
    cookies.get("__Secure-next-auth.session-token");

  // If user is logged in and tries to access auth pages, redirect to home
  // if (nextUrl.pathname.startsWith("/auth") && authToken) {
  // }
  
  // Allow public routes like `/` and `/auth`
  if (nextUrl.pathname.startsWith("/auth")) {
    if (authToken) {
      return NextResponse.redirect(new URL("/home", nextUrl));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the auth page
  if (!authToken) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",  // Protect the root route
    "/((?!api|_next|static|public).*)", // Protect all routes except `/api`, `/_next`, and assets
  ],
};