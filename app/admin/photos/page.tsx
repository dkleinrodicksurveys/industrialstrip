'use client'

import { useState, useEffect } from 'react'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Plus, Trash2, Image as ImageIcon, X, Check, RefreshCw, Link } from 'lucide-react'

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
  const [selectedCategory, setSelectedCategory] = useState('dancers')
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newPhotoAlt, setNewPhotoAlt] = useState('')

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

  const addPhotoByUrl = async () => {
    if (!newPhotoUrl.trim()) return

    try {
      const response = await fetch('/api/admin/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: newPhotoUrl.trim(),
          category: selectedCategory,
          alt: newPhotoAlt.trim() || 'Photo',
        }),
      })

      if (response.ok) {
        const newPhoto = await response.json()
        setPhotos(prev => [newPhoto, ...prev])
        setNewPhotoUrl('')
        setNewPhotoAlt('')
        setShowAddModal(false)
      }
    } catch (error) {
      console.error('Failed to add photo:', error)
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

  const filteredPhotos = photos.filter(p =>
    selectedCategory === 'all' || p.category === selectedCategory
  )

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
                Delete ({selectedPhotos.length})
              </button>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gold-500 text-black font-semibold py-3 px-6 rounded-sm transition-all duration-300 hover:bg-gold-400 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Photo
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedCategory === 'all'
                ? 'bg-gold-500 text-black font-semibold'
                : 'bg-luxury-card text-gray-300 hover:text-gold-500'
            }`}
          >
            All ({photos.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gold-500 text-black font-semibold'
                  : 'bg-luxury-card text-gray-300 hover:text-gold-500'
              }`}
            >
              {cat.label} ({photos.filter(p => p.category === cat.id).length})
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {isLoading ? (
          <div className="luxury-card p-12 text-center">
            <RefreshCw size={48} className="mx-auto mb-4 text-gold-500 animate-spin" />
            <p className="text-gray-400">Loading photos...</p>
          </div>
        ) : filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredPhotos.map(photo => (
              <div
                key={photo.id}
                className={`relative aspect-square luxury-card overflow-hidden group cursor-pointer ${
                  selectedPhotos.includes(photo.id) ? 'ring-2 ring-gold-500' : ''
                }`}
                onClick={() => toggleSelect(photo.id)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100"/><text fill="%23666" x="50" y="55" text-anchor="middle" font-size="12">No Image</text></svg>'
                  }}
                />

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
            <p className="text-gray-400">No photos in this category.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 btn-outline-gold"
            >
              Add Photo
            </button>
          </div>
        )}

        {/* Add Photo Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="luxury-card w-full max-w-md">
              <div className="p-6 border-b border-luxury-border flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Add Photo</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="form-label">Image URL</label>
                  <div className="relative">
                    <Link size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      value={newPhotoUrl}
                      onChange={e => setNewPhotoUrl(e.target.value)}
                      className="form-input pl-12"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Paste a direct link to an image (JPG, PNG, WebP)
                  </p>
                </div>

                {newPhotoUrl && (
                  <div className="border border-luxury-border rounded-sm p-2">
                    <img
                      src={newPhotoUrl}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="form-label">Description (optional)</label>
                  <input
                    type="text"
                    value={newPhotoAlt}
                    onChange={e => setNewPhotoAlt(e.target.value)}
                    className="form-input"
                    placeholder="Photo description"
                  />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
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
                </div>
              </div>

              <div className="p-6 border-t border-luxury-border flex justify-end gap-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addPhotoByUrl}
                  disabled={!newPhotoUrl.trim()}
                  className="btn-gold flex items-center gap-2 disabled:opacity-50"
                >
                  <Plus size={18} />
                  Add Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="luxury-card p-6">
          <h3 className="font-semibold text-white mb-2">Tips</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Add photos by pasting image URLs from any image hosting service</li>
            <li>• You can use Imgur, Cloudinary, or any direct image link</li>
            <li>• Photos automatically appear in the public gallery</li>
            <li>• Click photos to select them for bulk deletion</li>
          </ul>
        </div>
      </div>
    </ProtectedAdmin>
  )
}
