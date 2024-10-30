import { NextResponse } from "next/server";
import { cookies } from "next/headers"; 

export function middleware(req) {
  
  const token = req.cookies.get("accessToken")

  console.log("🚀 ~ middleware ~ token:", token);
  

  const protectedRoutes = ["/plans", "/projects", "/add-project", "/redirect", "/analytics"];
  const unProtectedRoutes = ["/login", "/sign-up", "/email-confirmed", "/forgot-password"];
  const regularRoutes = ["/"];


  if (token && regularRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/redirect", req.url));
  }


  if (req.nextUrl.pathname === "/analytics") {
   
    if (!req.nextUrl.search) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    if (req.nextUrl.search === "?id=TNAKLYTP") {
      return NextResponse.next();
    }
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
