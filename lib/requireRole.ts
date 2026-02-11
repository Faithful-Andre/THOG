import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { UserRole } from "@/lib/types"

export function requireRole(allowed: UserRole[]) {
  const cookieStore = cookies()
  const role = cookieStore.get("role")?.value as UserRole | undefined

  if (!role || !allowed.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return null
}
