import { NextResponse } from "next/server"
import { requireRole } from "@/lib/requireRole"
import { Patient } from "@/lib/types"

const patients = new Map<string, Patient>()

export async function GET() {
  const guard = requireRole(["clinician"])
  if (guard) return guard

  return NextResponse.json(Array.from(patients.values()))
}

export async function POST(req: Request) {
  const guard = requireRole(["clinician"])
  if (guard) return guard

  const body = await req.json()

  const patient: Patient = {
    id: crypto.randomUUID(),
    name: body.name,
    age: body.age,
    gender: body.gender,
    createdAt: new Date().toISOString(),
  }

  patients.set(patient.id, patient)
  return NextResponse.json(patient)
}
