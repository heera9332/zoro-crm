import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/", "/auth", "/api/public"];

// Your JWT secret. In prod, use process.env.JWT_SECRET
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Allow public routes and static files
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 1. Try to get token from cookie or Authorization header
  let token = req.cookies.get("token")?.value || null;
  if (!token && req.headers.get("authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("authorization")!.replace("Bearer ", "");
  }

  // 2. If token not found, redirect to login
  if (!token) {
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("redirect_to", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Validate token
  try {
    const payload = await jwtVerify(token, JWT_SECRET);
    // Optional: attach user payload to request
    // @ts-ignore
    req.user = payload;
    return NextResponse.next();
  } catch (e) {
    // Token invalid/expired
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("redirect_to", pathname + search);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    // Protect everything except these:
    "/((?!_next|static|favicon.ico|auth|api/public).*)",
  ],
};
