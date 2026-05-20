import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSplashMode } from "@/lib/splash";

export function middleware(request: NextRequest) {
  if (!isSplashMode()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/studio")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url), 307);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|webp|gif|txt|xml|webmanifest)$).*)",
  ],
};
