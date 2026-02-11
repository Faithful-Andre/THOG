"use client"

import { useState } from "react"
import { addVital } from "@/lib/api"
import { Vital } from "@/lib/types"

export default function AddVitalsForm({
  visitId,
  onAdd,
}: {
  visitId: string
  onAdd: (v: Vital) => void
}) {
  const [type, setType] = useState<Vital["type"]>("bp")
  const [value, setValue] = useState("")

  async function handleAdd() {
    if (!value.trim()) return

    const vital = await addVital(visitId, { type, value })
    onAdd(vital)
    setValue("")
  }

  return (
    <div className="space-y-2 border p-3 rounded">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Vital["type"])}
        className="border p-1 w-full"
      >
        <option value="bp">Blood Pressure</option>
        <option value="temp">Temperature</option>
        <option value="pulse">Pulse</option>
        <option value="resp">Respiration</option>
      </select>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
        className="border p-1 w-full"
      />

      <button
        type="button"
        onClick={handleAdd}
        className="bg-black text-white px-3 py-1 rounded"
      >
        Add Vital
      </button>
    </div>
  )
}
