import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { addPhoto, deletePhoto, getPhotos, Photo } from '@/lib/storage'
import { writeFile, unlink, mkdir } from 'fs/promises'
import path from 'path'

// Check if we're using Vercel Blob or local storage
const useVercelBlob = !!process.env.BLOB_READ_WRITE_TOKEN

export async function GET() {
  try {
    const photos = await getPhotos()
    return NextResponse.json(photos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'venue'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    let url: string

    if (useVercelBlob) {
      // Upload to Vercel Blob
      const { put } = await import('@vercel/blob')
      const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
        access: 'public',
      })
      url = blob.url
    } else {
      // Save locally for development
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      try {
        await mkdir(uploadsDir, { recursive: true })
      } catch {
        // Directory might already exist
      }

      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = path.join(uploadsDir, filename)
      await writeFile(filepath, buffer)
      url = `/uploads/${filename}`
    }

    const photo: Photo = {
      id: Date.now().toString(),
      url,
      category,
      alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      createdAt: new Date().toISOString(),
    }

    await addPhoto(photo)

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }

    // Get the photo to find its URL
    const photos = await getPhotos()
    const photo = photos.find(p => p.id === id)

    if (photo) {
      if (useVercelBlob && photo.url.includes('blob.vercel-storage.com')) {
        // Delete from Vercel Blob
        try {
          const { del } = await import('@vercel/blob')
          await del(photo.url)
        } catch {
          // Continue even if blob deletion fails
        }
      } else if (photo.url.startsWith('/uploads/')) {
        // Delete local file
        try {
          const filepath = path.join(process.cwd(), 'public', photo.url)
          await unlink(filepath)
        } catch {
          // Continue even if local deletion fails
        }
      }
    }

    await deletePhoto(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}
