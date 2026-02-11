"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("clinician")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !password) return

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })

    if (!res.ok) return

    const data = await res.json()

    localStorage.setItem("auth", "true")
    localStorage.setItem("role", data.role)

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center text-black">Sign Up</h1>

        <div>
          <label className="text-sm text-black">Email</label>
          <input
            className="w-full border rounded px-3 py-2 bg-white text-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-black">Password</label>
          <input
            className="w-full border rounded px-3 py-2 bg-white text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-black">Role</label>
          <select
            className="w-full border rounded text-black px-3 py-2 bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="clinician">Clinician</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
