"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem("auth")
    localStorage.removeItem("role")

    router.push("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  )
}
