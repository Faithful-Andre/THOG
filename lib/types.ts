export type Vital = {
  id: string
  type: "bp" | "temp" | "pulse" | "resp"
  value: string
  takenAt: string
}

export type Note = {
  id: string
  text: string
  createdAt: string
}

export type Visit = {
  id: string
  patientId: string
  startedAt: string
  vitals: Vital[]
  notes: Note[]
  closed: boolean
}

export type Patient = {
  id: string
  name: string
  age: number
  sex: "M" | "F"
  visits: Visit[]
}

// lib/types.ts

export type UserRole = "clinician" | "patient"

export type User = {
  id: string
  email: string
  role: UserRole
  name?: string
}