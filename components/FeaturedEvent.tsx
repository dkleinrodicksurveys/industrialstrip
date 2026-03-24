'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Sparkles, X } from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  time: string
  description: string
  features: string[]
  featured: boolean
  image?: string
}

export default function FeaturedEvent() {
  const [event, setEvent] = useState<Event | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetchFeaturedEvent()
  }, [])

  const fetchFeaturedEvent = async () => {
    try {
      const response = await fetch('/api/public/events')
      if (response.ok) {
        const events: Event[] = await response.json()
        const featured = events.find(e => e.featured)
        if (featured) {
          setEvent(featured)
        }
      }
    } catch (error) {
      console.error('Failed to fetch featured event:', error)
    }
  }

  if (!event || dismissed) return null

  return (
    <section className="relative bg-luxury-dark border-b border-gold-500/30 overflow-hidden">
      {/* Background image with overlay */}
      {event.image && (
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark via-luxury-dark/95 to-luxury-dark/80"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-5 md:py-6 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 md:top-1/2 md:-translate-y-1/2 md:right-4 p-1.5 bg-black/30 hover:bg-black/50 rounded-full transition-colors text-white/70 hover:text-white z-10"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row md:items-center gap-5 pr-10">
          {/* Event image thumbnail */}
          {event.image && (
            <div className="hidden md:block w-24 h-24 rounded-sm overflow-hidden flex-shrink-0 border-2 border-gold-500/50">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-gold-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-gold-500">
                Coming Up
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{event.title}</h3>

            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={14} className="text-gold-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={14} className="text-gold-500" />
                <span>{event.time}</span>
              </div>
            </div>

            {/* Feature tags */}
            {event.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.features.slice(0, 4).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-gold-500/20 text-gold-400 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="md:flex-shrink-0">
            <Link
              href="/events"
              className="btn-gold inline-block text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
