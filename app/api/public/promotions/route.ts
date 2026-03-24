import { NextResponse } from 'next/server'
import { getPromotions } from '@/lib/storage'

export async function GET() {
  try {
    const promotions = await getPromotions()
    // Only return active promotions to the public
    const activePromotions = promotions.filter(p => p.active)
    return NextResponse.json(activePromotions)
  } catch (error) {
    return NextResponse.json([])
  }
}
