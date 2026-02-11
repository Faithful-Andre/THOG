"use client"

import React, { useState } from "react"
import { useVisitStore } from "@/lib/store"

export default function VisitPage({
  params,
}: {
  params: Promise<{ patientId: string; visitId: string }>
}) {
  const { patientId, visitId } = React.use(params)

  const addVisit = useVisitStore((s) => s.addVisit)

  const [closed, setClosed] = useState(false)

  const [bloodPressure, setBloodPressure] = useState("")
  const [heartRate, setHeartRate] = useState("")
  const [temperature, setTemperature] = useState("")
  const [notes, setNotes] = useState("")

  function handleSave() {
    console.log("SAVED VISIT DATA", {
      patientId,
      visitId,
      bloodPressure,
      heartRate,
      temperature,
      notes,
    })
  }

  function handleClose() {
    if (!bloodPressure && !heartRate && !temperature && !notes) {
      alert("Cannot close empty visit")
      return
    }

    addVisit({
      id: visitId,
      patientId,
      status: "closed",
      vitals: {
        bloodPressure,
        heartRate,
        temperature,
      },
      notes,
      createdAt: new Date().toISOString(),
      closedAt: new Date().toISOString(),
    })

    setClosed(true)
  }

  return (
    <div className="p-6 space-y-8 bg-white text-black">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Visit</h1>
          <p className="text-sm text-gray-500">Visit ID: {visitId}</p>
          <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
        </div>

        {!closed && (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save Visit
            </button>
            <button
              onClick={handleClose}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Close Visit
            </button>
          </div>
        )}
      </div>

      {/* STATUS */}
      <div className="border rounded p-4">
        <p className="text-sm text-gray-500">Status</p>
        <p className={`font-medium ${closed ? "text-red-600" : "text-green-600"}`}>
          {closed ? "Closed" : "Open"}
        </p>
      </div>

      {/* VITALS */}
      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold">Vitals</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500">Blood Pressure</label>
            <input
              className="w-full border rounded px-2 py-1 bg-white"
              placeholder="e.g. 120/80"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Heart Rate</label>
            <input
              className="w-full border rounded px-2 py-1 bg-white"
              placeholder="e.g. 72 bpm"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Temperature</label>
            <input
              className="w-full border rounded px-2 py-1 bg-white"
              placeholder="e.g. 36.6°C"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CLINICAL NOTES */}
      <div className="border rounded-lg p-4 space-y-2">
        <h2 className="font-semibold">Clinical Notes</h2>

        <textarea
          className="w-full border rounded p-2 min-h-50 bg-white"
          placeholder="Write observations, diagnosis, and notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  )
}
