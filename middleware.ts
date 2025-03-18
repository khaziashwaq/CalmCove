import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is /Journal
  if (path === "/Journal") {
    // Get the Firebase auth session cookie
    const session = request.cookies.get("__session");

    // If there's no session, redirect to sign in
    if (!session) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: "/Journal",
};
