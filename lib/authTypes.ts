export type UserRole = "clinician" | "patient"

export type User = {
  id: string
  email: string
  role: UserRole
}
