"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewPatientPage() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState<string | undefined>()
  const [dob, setDob] = useState<string | undefined>()

  const canSave = firstName.trim() && lastName.trim()

  function handleSave() {
    // 🔑 TEMP FRONTEND ID GENERATION
    const newPatientId = `P-${Math.floor(Math.random() * 900 + 100)}`

    // Later: persist via backend
    console.log("NEW PATIENT", {
      id: newPatientId,
      firstName,
      lastName,
      gender,
      dob,
    })

    // ✅ Correct flow → Profile
    router.push(`/dashboard/patients/${newPatientId}`)
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl bg-white text-gray-900">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add New Patient</h1>
          <p className="text-sm text-gray-500">
            Register a new patient into the system
          </p>
        </div>

        <Link
          href="/dashboard/patients"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to Patients
        </Link>
      </div>

      {/* BASIC IDENTITY */}
      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="font-semibold">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">First Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Last Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* DEMOGRAPHICS */}
      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="font-semibold">Demographics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500">Gender</label>
            <select
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setGender(e.target.value)}
            >
              <option>—</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Patient ID</label>
            <input
              className="w-full border rounded px-3 py-2"
              disabled
              placeholder="Auto-generated"
            />
          </div>
        </div>
      </div>

        {/* ===== CONTACT ===== */}
        <div className="border rounded-lg p-4 space-y-4">
            <h2 className="font-semibold">Contact</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="text-xs text-gray-500">Phone</label>
                <input
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. +1 555 123 4567"
                />
            </div>

            <div>
                <label className="text-xs text-gray-500">Email</label>
                <input
                className="w-full border rounded px-3 py-2"
                placeholder="e.g. patient@email.com"
                />
            </div>
            </div>
        </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="bg-black text-white px-5 py-2 rounded disabled:opacity-50"
        >
          Save Patient
        </button>

        <Link
          href="/dashboard/patients"
          className="px-5 py-2 border rounded"
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}
