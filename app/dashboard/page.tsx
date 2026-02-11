export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 bg-white text-black">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          High-level overview of clinic activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 bg-white border-black/10">
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-3xl font-semibold mt-1">—</p>
          <p className="text-xs text-gray-400 mt-1">
            All registered patients
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-white border-black/10">
          <p className="text-sm text-gray-500">Active Visits</p>
          <p className="text-3xl font-semibold mt-1">—</p>
          <p className="text-xs text-gray-400 mt-1">
            Currently open visits
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-white border-black/10">
          <p className="text-sm text-gray-500">Visits Closed Today</p>
          <p className="text-3xl font-semibold mt-1">—</p>
          <p className="text-xs text-gray-400 mt-1">
            Completed consultations
          </p>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="border rounded-lg p-4 bg-white border-black/10">
          <h2 className="font-semibold mb-2">Recent Activity</h2>
          <p className="text-sm text-gray-500">
            Latest visits, notes, and vitals will appear here.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            (Connected in Phase 2)
          </p>
        </div>

        {/* Clinic Notes */}
        <div className="border rounded-lg p-4 bg-white border-black/10">
          <h2 className="font-semibold mb-2">Clinic Notes</h2>
          <p className="text-sm text-gray-500">
            Important alerts, reminders, or announcements.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            (Optional / future use)
          </p>
        </div>
      </div>

      {/* Guidance Footer */}
      <div className="border rounded-lg p-4 border-black/10">
        <p className="text-sm text-gray-600">
          Use the sidebar to manage patients, start visits, and record vitals.
          This dashboard provides a quick overview only.
        </p>
      </div>
    </div>
  )
}
