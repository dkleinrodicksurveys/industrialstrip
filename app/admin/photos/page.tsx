'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Upload, Trash2, Image as ImageIcon, X, Check, RefreshCw } from 'lucide-react'

interface Photo {
  id: string
  url: string
  category: string
  alt: string
  createdAt: string
}

const categories = [
  { id: 'venue', label: 'Venue' },
  { id: 'dancers', label: 'Dancers' },
  { id: 'events', label: 'Events' },
]

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('venue')
  const [dragActive, setDragActive] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load photos on mount
  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data)
      }
    } catch (error) {
      console.error('Failed to load photos:', error)
    }
    setIsLoading(false)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    )
    if (files.length > 0) {
      await uploadFiles(files)
    }
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await uploadFiles(Array.from(files))
    }
  }

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true)

    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category', selectedCategory)

        const response = await fetch('/api/admin/photos', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const newPhoto = await response.json()
          setPhotos(prev => [newPhoto, ...prev])
        }
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const deletePhoto = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/photos?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPhotos(prev => prev.filter(p => p.id !== id))
        setSelectedPhotos(prev => prev.filter(pid => pid !== id))
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const deleteSelected = async () => {
    for (const id of selectedPhotos) {
      await deletePhoto(id)
    }
    setSelectedPhotos([])
  }

  const toggleSelect = (id: string) => {
    setSelectedPhotos(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <ProtectedAdmin>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Photos</h1>
            <p className="text-gray-400 mt-1">Manage your gallery images</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadPhotos}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-luxury-card text-gray-300 rounded-sm hover:text-gold-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            {selectedPhotos.length > 0 && (
              <button
                onClick={deleteSelected}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-sm hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={18} />
                Delete Selected ({selectedPhotos.length})
              </button>
            )}
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`luxury-card p-8 border-2 border-dashed transition-all duration-200 ${
            dragActive ? 'border-gold-500 bg-gold-500/5' : 'border-luxury-border'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
              <Upload size={32} className="text-gold-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {isUploading ? 'Uploading...' : 'Upload Photos'}
            </h3>
            <p className="text-gray-400 mb-4">
              Drag and drop images here, or click to select
            </p>

            {/* Category Selection */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gold-500 text-black font-semibold'
                      : 'bg-luxury-dark text-gray-300 hover:text-gold-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-outline-gold cursor-pointer inline-block"
            >
              Select Files
            </label>
          </div>
        </div>

        {/* Photos Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Gallery ({photos.length} photos)
          </h2>

          {photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {photos.map(photo => (
                <div
                  key={photo.id}
                  className={`relative aspect-square luxury-card overflow-hidden group cursor-pointer ${
                    selectedPhotos.includes(photo.id) ? 'ring-2 ring-gold-500' : ''
                  }`}
                  onClick={() => toggleSelect(photo.id)}
                >
                  {/* Actual image */}
                  {photo.url ? (
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-luxury-card to-luxury-dark flex items-center justify-center">
                      <ImageIcon size={32} className="text-gold-500/30" />
                    </div>
                  )}

                  {/* Selection indicator */}
                  <div className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                    selectedPhotos.includes(photo.id)
                      ? 'bg-gold-500 border-gold-500'
                      : 'border-white/50 bg-black/30 group-hover:border-white'
                  }`}>
                    {selectedPhotos.includes(photo.id) && (
                      <Check size={14} className="text-black" />
                    )}
                  </div>

                  {/* Category badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-gray-300 z-10">
                    {photo.category}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePhoto(photo.id)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 z-10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="luxury-card p-12 text-center">
              <ImageIcon size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No photos uploaded yet.</p>
              <p className="text-gray-500 text-sm mt-1">
                Upload some images to get started.
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="luxury-card p-6">
          <h3 className="font-semibold text-white mb-2">Tips</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Upload images in JPG, PNG, or WebP format for best results</li>
            <li>• Recommended size: 1200x800 pixels or larger</li>
            <li>• Photos will automatically appear in the public gallery</li>
            <li>• Select a category before uploading to organize your photos</li>
          </ul>
        </div>
      </div>
    </ProtectedAdmin>
  )
}
