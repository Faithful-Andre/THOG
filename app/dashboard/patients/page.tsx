"use client"

import Link from "next/link"

export default function PatientsPage() {
  // STATIC mock data for UX only
  const patients = [
    { id: "P-001", name: "John Doe", gender: "Male", age: 32 },
    { id: "P-002", name: "Jane Smith", gender: "Female", age: 28 },
    { id: "P-003", name: "Michael Brown", gender: "Male", age: 45 },
  ]

  return (
    <div className="p-6 space-y-6 bg-white text-black">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-sm text-gray-500">
            Manage and access patient records
          </p>
        </div>

        <Link
          href="/dashboard/patients/new"
          className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition">
          + Add Patient
        </Link>
      </div>

      {/* ===== SEARCH / FILTER (UX ONLY) ===== */}
      <div className="flex gap-4">
        <input
          className="w-full border rounded px-3 py-2 bg-white"
          placeholder="Search by name or patient ID..."
        />
      </div>

      {/* ===== PATIENTS TABLE ===== */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Patient ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{patient.id}</td>
                <td className="p-3 font-medium">{patient.name}</td>
                <td className="p-3">{patient.gender}</td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/dashboard/patients/${patient.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== EMPTY STATE ===== */}
      {patients.length === 0 && (
        <div className="border rounded p-6 text-center text-gray-500">
          No patients registered yet.
        </div>
      )}

    </div>
  )
}
