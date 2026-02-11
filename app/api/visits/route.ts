import { NextResponse } from "next/server"
import { requireRole } from "@/lib/requireRole"
import { Visit } from "@/lib/types"

const visits = new Map<string, Visit>()

export async function GET(req: Request) {
  const guard = requireRole(["clinician"])
  if (guard) return guard

  return NextResponse.json(Array.from(visits.values()))
}

export async function POST(req: Request) {
  const guard = requireRole(["clinician"])
  if (guard) return guard

  const body = await req.json()

  const visit: Visit = {
    id: body.visitId,
    patientId: body.patientId,
    startedAt: new Date().toISOString(),
    vitals: [],
    notes: [],
    closed: false,
  }

  visits.set(visit.id, visit)
  return NextResponse.json(visit)
}
