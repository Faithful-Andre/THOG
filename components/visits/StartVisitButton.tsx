"use client"

import { useRouter } from "next/navigation"

export default function StartVisitButton({
  patientId,
}: {
  patientId: string
}) {
  const router = useRouter()

  function handleStart() {
    // guard
    if (!patientId) {
      console.error("StartVisitButton received undefined patientId")
      return
    }

    // generate a mock visit id (since no backend yet)
    const visitId = crypto.randomUUID()

    router.push(
      `/dashboard/patients/${patientId}/visit/${visitId}`
    )
  }

  return (
    <button
      onClick={handleStart}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Start Visit
    </button>
  )
}
