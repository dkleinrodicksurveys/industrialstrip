'use client'

import { useState, useEffect } from 'react'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Plus, Edit2, Trash2, Calendar, X, Save, Image as ImageIcon, RefreshCw } from 'lucide-react'

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

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  const emptyEvent: Event = {
    id: '',
    title: '',
    date: '',
    time: '',
    description: '',
    features: [],
    featured: false,
    image: '',
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!editingEvent) return

    try {
      if (isCreating) {
        const response = await fetch('/api/admin/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingEvent),
        })
        if (response.ok) {
          const newEvent = await response.json()
          setEvents(prev => [...prev, newEvent])
        }
      } else {
        const response = await fetch('/api/admin/events', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingEvent),
        })
        if (response.ok) {
          setEvents(prev => prev.map(e => e.id === editingEvent.id ? editingEvent : e))
        }
      }
    } catch (error) {
      console.error('Failed to save event:', error)
    }

    setEditingEvent(null)
    setIsCreating(false)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setEvents(prev => prev.filter(e => e.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && editingEvent) {
      setEditingEvent({
        ...editingEvent,
        features: [...editingEvent.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        features: editingEvent.features.filter((_, i) => i !== index)
      })
    }
  }

  return (
    <ProtectedAdmin>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Events</h1>
            <p className="text-gray-400 mt-1">Manage your events and special nights</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadEvents}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-luxury-card text-gray-300 rounded-sm hover:text-gold-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => {
                setEditingEvent(emptyEvent)
                setIsCreating(true)
              }}
              className="btn-gold flex items-center gap-2"
            >
              <Plus size={18} />
              Add Event
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className={`luxury-card p-6 ${event.featured ? 'border-gold-500/50' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Event Image */}
                {event.image && (
                  <div className="w-full md:w-32 h-32 rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    {event.featured && (
                      <span className="px-2 py-1 bg-gold-500 text-black text-xs font-bold rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm mb-3">
                    <span className="text-gold-500">{event.date}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{event.time}</span>
                  </div>
                  <p className="text-gray-300 mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-luxury-black text-gray-400 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditingEvent(event)
                      setIsCreating(false)
                    }}
                    className="p-2 text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && !isLoading && (
            <div className="luxury-card p-12 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No events created yet.</p>
              <p className="text-gray-500 text-sm mt-1">
                Add your first event to get started.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="luxury-card p-12 text-center">
              <RefreshCw size={48} className="mx-auto mb-4 text-gold-500 animate-spin" />
              <p className="text-gray-400">Loading events...</p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="luxury-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-luxury-border flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {isCreating ? 'Create Event' : 'Edit Event'}
                </h2>
                <button
                  onClick={() => {
                    setEditingEvent(null)
                    setIsCreating(false)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="form-label">Event Title</label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="form-input"
                    placeholder="Memorial Day Weekend Bash"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Date</label>
                    <input
                      type="text"
                      value={editingEvent.date}
                      onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="form-input"
                      placeholder="May 24-26, 2025 or Every Thursday"
                    />
                  </div>
                  <div>
                    <label className="form-label">Time</label>
                    <input
                      type="text"
                      value={editingEvent.time}
                      onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })}
                      className="form-input"
                      placeholder="9 PM - 3 AM"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={editingEvent.description}
                    onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Describe the event..."
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="form-label">Event Image URL</label>
                  <input
                    type="text"
                    value={editingEvent.image || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, image: e.target.value })}
                    className="form-input"
                    placeholder="https://example.com/image.jpg or /uploads/image.jpg"
                  />
                  {editingEvent.image && (
                    <div className="mt-3 relative w-40 h-40 rounded-sm overflow-hidden border border-luxury-border">
                      <img
                        src={editingEvent.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    Tip: Upload images in the Photos section first, then copy the URL here.
                    Featured events show this image on the homepage banner.
                  </p>
                </div>

                <div>
                  <label className="form-label">Features / Highlights</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={e => setNewFeature(e.target.value)}
                      className="form-input flex-1"
                      placeholder="Add a feature (e.g., $10 Dances)"
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <button
                      onClick={addFeature}
                      type="button"
                      className="btn-outline-gold px-4"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingEvent.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gold-500/10 text-gold-500 text-sm rounded flex items-center gap-2"
                      >
                        {feature}
                        <button onClick={() => removeFeature(i)} className="hover:text-white">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingEvent.featured}
                    onChange={e => setEditingEvent({ ...editingEvent, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-gold-500 focus:ring-gold-500"
                  />
                  <label htmlFor="featured" className="text-gray-300">
                    Mark as featured event (shown on homepage banner)
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-luxury-border flex justify-end gap-4">
                <button
                  onClick={() => {
                    setEditingEvent(null)
                    setIsCreating(false)
                  }}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-gold flex items-center gap-2">
                  <Save size={18} />
                  {isCreating ? 'Create Event' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedAdmin>
  )
}
