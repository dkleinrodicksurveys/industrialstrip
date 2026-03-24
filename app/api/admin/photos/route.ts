import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { addPhoto, deletePhoto, getPhotos, Photo } from '@/lib/storage'

// Simple auth check
async function isAuthenticated() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'authenticated'
}

export async function GET() {
  try {
    const photos = await getPhotos()
    return NextResponse.json(photos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { url, category, alt } = data

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    const photo: Photo = {
      id: Date.now().toString(),
      url,
      category: category || 'venue',
      alt: alt || 'Photo',
      createdAt: new Date().toISOString(),
    }

    await addPhoto(photo)

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Add photo error:', error)
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 })
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

    await deletePhoto(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}
