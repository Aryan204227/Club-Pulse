import { NextResponse } from "next/server";

// Unit IV: Protected Routes & Role-Based Access Control (RBAC)
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/profile",
  "/my-activity",
  "/recruitment",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Allow public assets, internal next static files, and API routes to proceed freely
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 2. Check if the current route requires authentication
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // 3. Extract Session Identifiers from Cookies (Unit IV Session Management)
  const userId = request.cookies.get("clubpulse_user_id")?.value;
  const token =
    request.cookies.get("clubpulse_token")?.value ||
    request.cookies.get("auth_token")?.value;
  const personaCookie = request.cookies.get("active_persona")?.value;

  const isAuthenticated = Boolean(userId || token || personaCookie);

  const effectiveRole = (
    request.cookies.get("clubpulse_session_role")?.value ||
    request.cookies.get("clubpulse_role")?.value ||
    personaCookie ||
    "student"
  ).toLowerCase();

  // 4. Handle Unauthenticated Access to Protected Routes
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. If user is already authenticated and visits /login or /signup, redirect to their dashboard
  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    const destination = effectiveRole === "admin" ? "/dashboard/admin" : "/dashboard/student";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 6. Role-Based Access Control (RBAC) Enforcements
  // Only Admins can access /admin and /dashboard/admin
  if ((pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin")) && effectiveRole !== "admin") {
    const unauthorizedUrl = new URL("/unauthorized", request.url);
    unauthorizedUrl.searchParams.set("requiredRole", "admin");
    return NextResponse.redirect(unauthorizedUrl);
  }

  // Only Leaders and Admins can access /dashboard/leader and /recruitment
  if (
    (pathname.startsWith("/dashboard/leader") || pathname.startsWith("/recruitment")) &&
    effectiveRole !== "leader" &&
    effectiveRole !== "admin"
  ) {
    const unauthorizedUrl = new URL("/unauthorized", request.url);
    unauthorizedUrl.searchParams.set("requiredRole", "leader");
    return NextResponse.redirect(unauthorizedUrl);
  }

  // 7. Attach RBAC context headers for server components & edge tracing
  const response = NextResponse.next();
  response.headers.set("x-clubpulse-rbac", effectiveRole);
  response.headers.set("x-clubpulse-user", userId || "anonymous");
  response.headers.set("x-clubpulse-route-type", isProtected ? "protected" : "public");

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/my-activity/:path*",
    "/recruitment/:path*",
    "/login",
    "/signup",
  ],
};
