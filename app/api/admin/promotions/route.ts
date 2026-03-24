import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPromotions, addPromotion, updatePromotion, deletePromotion, Promotion } from '@/lib/storage'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'authenticated'
}

export async function GET() {
  try {
    const promotions = await getPromotions()
    return NextResponse.json(promotions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const promotion: Promotion = await request.json()
    promotion.id = Date.now().toString()
    await addPromotion(promotion)
    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const promotion: Promotion = await request.json()
    await updatePromotion(promotion)
    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promotion' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }

    await deletePromotion(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promotion' }, { status: 500 })
  }
}
