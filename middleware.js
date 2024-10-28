import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken");
  const protectedRoutes = ["/plans", "/projects", "/add-project", "/redirect", "/analytics"];
  const unProtectedRoutes = [
    "/login",
    "/sign-up",
    "/email-confirmed",
    "/forgot-password",
  ];
  const regularRoutes = ["/"]

  if (token && regularRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/redirect", req.url));
  }

  if (req.nextUrl.pathname === "/analytics" && !req.nextUrl.search) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname === "/analytics" && req.nextUrl.search === "?id=TNAKLYTP") {
    return NextResponse.next();
  }

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && unProtectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/redirect", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/email-confirmed",
    "/forgot-password",
    "/plans",
    "/redirect",
    "/profile",
    "/projects",
    "/add-project",
    "/analytics",
  ],
};
