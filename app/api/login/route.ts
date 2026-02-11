import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body

  // TEMP Phase 1 logic
  const role =
    email.includes("patient") ? "patient" : "clinician"

  const res = NextResponse.json({ role })

  res.cookies.set("auth", "true", { path: "/" })
  res.cookies.set("role", role, { path: "/" })

  return res
}
