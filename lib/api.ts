// lib/api.ts
import { Visit } from "@/lib/types"

export async function startVisit(patientId: string): Promise<Visit> {
  const res = await fetch("/api/visits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitId: crypto.randomUUID(),
      patientId,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to start visit")
  }

  return res.json()
}

export async function closeVisit(visitId: string): Promise<Visit | null> {
  const res = await fetch("/api/visits", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitId }),
  })

  if (!res.ok) return null
  return res.json()
}

export async function getVisitsByPatient(patientId: string): Promise<Visit[]> {
  const res = await fetch(`/api/visits?patientId=${patientId}`, {
    cache: "no-store",
  })

  if (!res.ok) return []
  return res.json()
}
