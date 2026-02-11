"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Topbar() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const r = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1]

    setRole(r ?? null)
  }, [])

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <div className="w-full h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
      <div className="text-sm text-gray-600">
        Role: <span className="font-medium">{role}</span>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm bg-black text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  )
}
