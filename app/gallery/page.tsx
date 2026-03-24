'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface Photo {
  id: string
  url: string
  category: string
  alt: string
  createdAt: string
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'venue', label: 'Venue' },
  { id: 'dancers', label: 'Dancers' },
  { id: 'events', label: 'Events' },
]

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      const response = await fetch('/api/public/photos')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data)
      }
    } catch (error) {
      console.error('Failed to load photos:', error)
    }
    setIsLoading(false)
  }

  const filteredImages = selectedCategory === 'all'
    ? photos
    : photos.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxImage(index)
  const closeLightbox = () => setLightboxImage(null)

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage === null) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, filteredImages.length])

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-gradient">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take a peek inside Northwest Indiana&apos;s most luxurious gentlemen&apos;s club.
            Updated weekly with new photos.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gold-500 text-black font-semibold'
                    : 'bg-luxury-card border border-luxury-border text-gray-300 hover:border-gold-500/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <Loader2 size={48} className="mx-auto mb-4 text-gold-500 animate-spin" />
              <p className="text-gray-400">Loading gallery...</p>
            </div>
          ) : filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="aspect-square relative luxury-card overflow-hidden cursor-pointer group img-zoom"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{image.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">No images in this category yet.</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage !== null && filteredImages[lightboxImage] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-gold-500 transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white hover:text-gold-500 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="max-w-4xl max-h-[80vh] px-16">
            <img
              src={filteredImages[lightboxImage].url}
              alt={filteredImages[lightboxImage].alt}
              className="max-w-full max-h-[75vh] object-contain mx-auto rounded-sm"
            />
            <p className="text-center text-gray-400 mt-4">
              {filteredImages[lightboxImage].alt}
            </p>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white hover:text-gold-500 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400">
            {lightboxImage + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      {/* Notice */}
      <section className="px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Gallery updated weekly. Follow us on social media for the latest updates.
          </p>
        </div>
      </section>
    </div>
  )
}
