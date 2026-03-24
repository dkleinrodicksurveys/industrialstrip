import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/storage'

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json([])
  }
}
