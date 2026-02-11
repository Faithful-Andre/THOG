import { mockVisits } from '@/lib/api'

export default function VitalsTimeline() {
  return (
    <section>
      <h3>Vitals History</h3>

      {mockVisits.map((visit) => (
        <div key={visit.id}>
          <strong>Visit: {visit.date}</strong>
          <ul>
            {visit.vitals.map((vital) => (
              <li key={vital.id}>
                {vital.type}: {vital.value} ({vital.recordedAt})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
