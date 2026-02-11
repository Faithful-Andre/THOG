import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value
  const url = req.nextUrl.clone()

  // Not logged in
  if (!role) {
    if (!url.pathname.startsWith("/login")) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Role-based redirect
  if (url.pathname === "/dashboard") {
    if (role === "patient") {
      url.pathname = "/patient-dashboard"
      return NextResponse.redirect(url)
    }
  }

  if (url.pathname === "/patient-dashboard") {
    if (role === "clinician") {
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/patient-dashboard", "/login"],
}
