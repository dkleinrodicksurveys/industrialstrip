import { NextResponse } from 'next/server'
import { getPhotos } from '@/lib/storage'

export async function GET() {
  try {
    const photos = await getPhotos()
    return NextResponse.json(photos)
  } catch (error) {
    return NextResponse.json([])
  }
}
