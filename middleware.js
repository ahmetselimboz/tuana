import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export async function middleware(req) {
  const cookieStore = cookies();
  const token =
    (await cookieStore.get("accessToken"))?.value || req.cookies.accessToken;

  console.log("🚀 ~ middleware ~ token:", token);

  const protectedRoutes = [
    "/plans",
    "/projects",
    "/add-project",
    "/redirect",
    "/analytics",
  ];
  const unProtectedRoutes = [
    "/login",
    "/sign-up",
    "/email-confirmed",
    "/forgot-password",
  ];

  const dashboardUrls = ["/analytics", "/user-interactions", "/seo"];
  const regularRoutes = ["/"];

  if (dashboardUrls.includes(req.nextUrl.pathname)) {

    if (!req.nextUrl.search.startsWith("?id=")) {
      console.log("req.nextUrl: ", req.nextUrl);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (token && regularRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/redirect", req.url));
  }

  if (dashboardUrls.includes(req.nextUrl.pathname)) {
    if (!req.nextUrl.search) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.nextUrl.search === "?id=TNAKLYTP") {
      return NextResponse.next();
    }

    // if (!req.nextUrl.search.startsWith("?id=")) {
    //   console.log("req.nextUrl: ", req.nextUrl);
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
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
