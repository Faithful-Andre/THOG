"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Moon, Sun, ChevronLeft } from "lucide-react"

export default function Sidebar({ patientCount = 0 }: { patientCount?: number }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)

  const isDashboard = pathname === "/dashboard"

  const [role, setRole] = useState<string | null>(null)

  const isPatients =
    pathname === "/dashboard/patients" ||
    pathname.startsWith("/dashboard/patients/")

  const linkClass = (active: boolean) =>
    `relative block px-4 py-2 rounded transition-all duration-300 ease-in-out overflow-hidden ${
      active
        ? "bg-black text-white translate-x-1 shadow-md"
        : "text-gray-700  hover:bg-gray-100 hover:translate-x-1"
    } hover:shadow-[0_0_8px_rgba(255,0,0,0.25)]`

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  useEffect(() => {
    const r = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1]

    setRole(r ?? null)

    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  return (
    <aside
      className={`
        h-screen transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        backdrop-blur-xl bg-white
        border-r border-black/10
      `}
    >
      <nav className="p-4 space-y-2 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h2 className="icon-dena text-lg font-bold tracking-wide text-black">
              T.H.O.G
            </h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="transition-transform hover:scale-110 text-black"
          >
            <ChevronLeft
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dashboard (clinician only) */}
        {role === "clinician" && (
          <Link href="/dashboard" className={linkClass(isDashboard)}>
            <span
              className={`absolute left-0 top-0 h-full w-1 bg-red-500 transition-all duration-300 ${
                isDashboard ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            />
            <span className="flex items-center gap-3">
              <span
                className={`transition-all duration-300 ${
                  isDashboard ? "scale-110 rotate-3" : "scale-100 rotate-0"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"
                  />
                </svg>
              </span>
              {!collapsed && "Dashboard"}
            </span>
          </Link>
        )}

        {/* Patients (clinician only) */}
        {role === "clinician" && (
          <Link href="/dashboard/patients" className={linkClass(isPatients)}>
            <span
              className={`absolute left-0 top-0 h-full w-1 bg-red-500 transition-all duration-300 ${
                isPatients ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            />
            <span className="flex items-center justify-between w-full">
              <span className="flex items-center gap-3">
                <span
                  className={`transition-all duration-300 ${
                    isPatients ? "scale-110 rotate-3" : "scale-100 rotate-0"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 21v-1a7 7 0 0114 0v1"
                    />
                  </svg>
                </span>
                {!collapsed && "Patients"}
              </span>

              {!collapsed && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                  {patientCount}
                </span>
              )}
            </span>
          </Link>
        )}

        {/* Patient dashboard (patient only) */}
        {role === "patient" && (
          <Link href="/patient-dashboard" className={linkClass(false)}>
            <span className="flex items-center gap-3">
              {!collapsed && "My Dashboard"}
            </span>
          </Link>
        )}
      </nav>
    </aside>
  )
}
