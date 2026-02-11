// lib/store.ts
import { create } from "zustand"

export type Visit = {
  id: string
  patientId: string
  status: "open" | "closed"
  vitals: {
    bloodPressure: string
    heartRate: string
    temperature: string
  }
  notes: string
  createdAt: string
  closedAt?: string
}

type VisitStore = {
  visits: Visit[]
  addVisit: (visit: Visit) => void
}

export const useVisitStore = create<VisitStore>((set) => ({
  visits: [],
  addVisit: (visit) =>
    set((state) => ({
      visits: [...state.visits, visit],
    })),
}))
