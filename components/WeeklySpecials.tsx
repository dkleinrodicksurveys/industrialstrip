'use client'

import { useEffect, useState } from 'react'
import { Star, Clock } from 'lucide-react'

interface WeeklySpecial {
  id: string
  title: string
  day: string
  time: string
  description: string
  features: string[]
  image?: string
  active: boolean
}

export default function WeeklySpecials() {
  const [specials, setSpecials] = useState<WeeklySpecial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/weekly-specials')
      .then(res => res.json())
      .then(data => {
        setSpecials(data.filter((s: WeeklySpecial) => s.active))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  if (isLoading || specials.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-luxury-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">
            Weekly Specials
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Something special every night of the week
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map(special => (
            <div
              key={special.id}
              className="luxury-card overflow-hidden group"
            >
              {special.image && (
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={special.image}
                    alt={special.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2 py-1 bg-gold-500 text-black text-xs font-bold rounded">
                      Every {special.day}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">{special.title}</h3>

                {!special.image && (
                  <p className="text-gold-500 text-sm mb-1">Every {special.day}</p>
                )}

                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Clock size={14} className="mr-1" />
                  {special.time}
                </div>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{special.description}</p>

                <ul className="space-y-1">
                  {special.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300 text-xs">
                      <Star size={10} className="text-gold-500 mr-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
