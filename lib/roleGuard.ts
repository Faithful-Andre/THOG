export function requireRole(required: "clinician" | "patient") {
  if (typeof window === "undefined") return false

  const role = localStorage.getItem("role")
  return role === required
}
