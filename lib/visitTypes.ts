// lib/visitTypes.ts

export type Visit = {
  id: string
  patientId: string
  status: "open" | "closed"
  vitals?: {
    bloodPressure?: string
    heartRate?: string
    temperature?: string
  }
  notes?: string
  createdAt: string
  closedAt?: string
}
