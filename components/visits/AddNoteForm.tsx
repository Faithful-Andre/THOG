"use client"

import { useState } from "react"
import { Note } from "@/lib/types"

export default function AddNoteForm({
  visitId,
  onAdd,
}: {
  visitId: string
  onAdd: (note: Note) => void
}) {
  const [text, setText] = useState("")

  function handleAdd() {
    if (!text.trim()) return

    const newNote: Note = {
      id: crypto.randomUUID(),
      visitId,
      text,
      createdAt: new Date().toISOString(),
    }

    onAdd(newNote)
    setText("")
  }

  return (
    <div className="space-y-2">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write clinical note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="button"
        onClick={handleAdd}
        className="bg-black text-white px-3 py-1 rounded"
      >
        Add Note
      </button>
    </div>
  )
}
