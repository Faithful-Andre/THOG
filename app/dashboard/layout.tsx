import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

async function getPatientCount() {
  const res = await fetch("http://localhost:3000/api/patients", {
    cache: "no-store",
  })

  if (!res.ok) return 0

  const patients = await res.json()
  return patients.length
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen bg-white transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-white">
        <Topbar />
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </section>
  )
}