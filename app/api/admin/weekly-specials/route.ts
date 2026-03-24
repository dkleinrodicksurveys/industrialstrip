import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getWeeklySpecials, addWeeklySpecial, updateWeeklySpecial, deleteWeeklySpecial, WeeklySpecial } from '@/lib/storage'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'authenticated'
}

export async function GET() {
  try {
    const specials = await getWeeklySpecials()
    return NextResponse.json(specials)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weekly specials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const special: WeeklySpecial = await request.json()
    special.id = Date.now().toString()
    await addWeeklySpecial(special)
    return NextResponse.json(special)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create weekly special' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const special: WeeklySpecial = await request.json()
    await updateWeeklySpecial(special)
    return NextResponse.json(special)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update weekly special' }, { status: 500 })
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

    await deleteWeeklySpecial(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete weekly special' }, { status: 500 })
  }
}
