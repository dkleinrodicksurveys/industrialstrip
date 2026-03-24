'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Loader2 } from 'lucide-react'
import Link from 'next/link'

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/public/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    }
    setIsLoading(false)
  }

  const featuredEvent = events.find(e => e.featured)

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-gradient">Events</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don&apos;t miss out on our special events and themed nights.
            Something exciting happening every week.
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="text-center py-20">
          <Loader2 size={48} className="mx-auto mb-4 text-gold-500 animate-spin" />
          <p className="text-gray-400">Loading events...</p>
        </div>
      ) : (
        <>
          {/* Featured Event */}
          {featuredEvent && (
            <section className="px-4 mb-16">
              <div className="max-w-5xl mx-auto">
                <div className="luxury-card p-8 md:p-12 border-gold-500 gold-glow relative overflow-hidden">
                  {/* Background image */}
                  {featuredEvent.image && (
                    <div className="absolute inset-0">
                      <img
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        className="w-full h-full object-cover opacity-20"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-luxury-card via-luxury-card/95 to-luxury-card/80"></div>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute top-0 right-0 bg-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                      FEATURED EVENT
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                          {featuredEvent.title}
                        </h2>

                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center gap-2 text-gold-500">
                            <Calendar size={18} />
                            <span>{featuredEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gold-500">
                            <Clock size={18} />
                            <span>{featuredEvent.time}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6">{featuredEvent.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {featuredEvent.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gold-500/10 text-gold-500 text-sm rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-luxury-black/50 rounded-sm p-8 text-center">
                        {featuredEvent.image ? (
                          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gold-500/50">
                            <img
                              src={featuredEvent.image}
                              alt={featuredEvent.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                            <Users size={40} className="text-gold-500" />
                          </div>
                        )}
                        <h3 className="text-2xl font-semibold text-white mb-2">Don&apos;t Miss Out!</h3>
                        <p className="text-gray-400 mb-6">Our biggest event coming up</p>
                        <Link href="/contact" className="btn-gold">
                          Get Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="section-divider max-w-4xl mx-auto"></div>

          {/* All Events Grid */}
          <section className="px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-center text-white">
                All Events
              </h2>

              {events.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`luxury-card overflow-hidden hover:border-gold-500/50 transition-all duration-300 ${
                        event.featured ? 'border-gold-500/30' : ''
                      }`}
                    >
                      {/* Event Image */}
                      {event.image && (
                        <div className="h-40 overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                          {event.featured && (
                            <span className="px-2 py-0.5 bg-gold-500 text-black text-xs font-bold rounded flex-shrink-0">
                              FEATURED
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 mb-4 text-sm">
                          <span className="text-gold-500">{event.date}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{event.time}</span>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {event.features.slice(0, 3).map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-luxury-black text-gray-400 text-xs rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {event.features.length > 3 && (
                            <span className="px-2 py-1 text-gold-500 text-xs">
                              +{event.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">No events scheduled yet.</p>
                  <p className="text-gray-500 text-sm mt-1">Check back soon!</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center luxury-card p-12">
          <h2 className="font-display text-3xl font-bold mb-4 text-white">
            Want to Host a Private Event?
          </h2>
          <p className="text-gray-400 mb-6">
            Bachelor parties, birthdays, corporate events - we&apos;ve got you covered.
          </p>
          <Link href="/contact" className="btn-gold">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
