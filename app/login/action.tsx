"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function loginUser(user: {
  email: string
  role: "clinician" | "patient"
}) {
  // set role cookie
  cookies().set("role", user.role, {
    path: "/",
    httpOnly: false, // must be readable by Sidebar
  })

  // redirect by role
  if (user.role === "clinician") {
    redirect("/dashboard")
  }

  if (user.role === "patient") {
    redirect("/patient-dashboard")
  }
}
