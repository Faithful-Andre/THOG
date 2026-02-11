"use client"

import { use } from "react"
import StartVisitButton from "@/components/visits/StartVisitButton"
import { mockPatients } from "@/lib/mockPatients"
import { useVisitStore } from "@/lib/store"

export default function PatientProfile({
  params,
}: {
  params: Promise<{ patientId: string }>
}) {
  const { patientId } = use(params)

  const patient = mockPatients.find((p) => p.id === patientId)

  const allVisits = useVisitStore((s) => s.visits)
  const visits = allVisits.filter((v) => v.patientId === patientId)

  if (!patient) {
    return (
      <div className="p-6 bg-white">
        <h1 className="text-xl font-semibold">Patient not found</h1>
        <p className="text-sm text-gray-500">
          No patient exists with ID {patientId}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8 bg-white text-black">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patient Profile</h1>
          <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
        </div>

        <StartVisitButton patientId={patientId} />
      </div>

      {/* SUMMARY */}
      <div className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div>
          <p className="text-xs text-gray-500">Full Name</p>
          <p className="font-medium">{patient.name}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Gender</p>
          <p className="font-medium">{patient.gender ?? "—"}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Date of Birth</p>
          <p className="font-medium">{patient.dob ?? "—"}</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Current Visit</p>
          <p className="font-semibold text-gray-400">No active visit</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Visits</p>
          <p className="font-semibold">{visits.length}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Last Seen</p>
          <p className="font-semibold">
            {visits.length > 0
              ? new Date(visits[visits.length - 1].closedAt!).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>

      {/* VISIT HISTORY */}
      <div className="border rounded-lg p-4 space-y-2">
        <h2 className="font-semibold">Visit History</h2>

        {visits.length === 0 && (
          <p className="text-sm text-gray-500">No visits recorded yet.</p>
        )}

        {visits.map(v => (
          <div key={v.id} className="border rounded p-2 text-sm">
            <p>Visit ID: {v.id}</p>
            <p>Status: {v.status}</p>
            <p>Closed: {new Date(v.closedAt!).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* PLACEHOLDERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-1">Recent Vitals</h2>
          <p className="text-sm text-gray-500">
            Vitals will appear here after a visit.
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-semibold mb-1">Recent Notes</h2>
          <p className="text-sm text-gray-500">
            Clinical notes will appear here.
          </p>
        </div>
      </div>

    </div>
  )
}
