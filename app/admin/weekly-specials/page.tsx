'use client'

import { useState, useEffect } from 'react'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Plus, Edit2, Trash2, Calendar, X, Save, RefreshCw, Link } from 'lucide-react'

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

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Monday & Tuesday',
  'Friday & Saturday',
  'Weekends',
]

export default function AdminWeeklySpecials() {
  const [specials, setSpecials] = useState<WeeklySpecial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingSpecial, setEditingSpecial] = useState<WeeklySpecial | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  const emptySpecial: WeeklySpecial = {
    id: '',
    title: '',
    day: 'Monday',
    time: '',
    description: '',
    features: [],
    image: '',
    active: true,
  }

  useEffect(() => {
    loadSpecials()
  }, [])

  const loadSpecials = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/weekly-specials')
      if (response.ok) {
        const data = await response.json()
        setSpecials(data)
      }
    } catch (error) {
      console.error('Failed to load weekly specials:', error)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!editingSpecial) return

    try {
      if (isCreating) {
        const response = await fetch('/api/admin/weekly-specials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingSpecial),
        })
        if (response.ok) {
          const newSpecial = await response.json()
          setSpecials(prev => [...prev, newSpecial])
        }
      } else {
        const response = await fetch('/api/admin/weekly-specials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingSpecial),
        })
        if (response.ok) {
          setSpecials(prev => prev.map(s => s.id === editingSpecial.id ? editingSpecial : s))
        }
      }
    } catch (error) {
      console.error('Failed to save weekly special:', error)
    }

    setEditingSpecial(null)
    setIsCreating(false)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/weekly-specials?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setSpecials(prev => prev.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete weekly special:', error)
    }
  }

  const toggleActive = async (id: string) => {
    const special = specials.find(s => s.id === id)
    if (!special) return

    const updated = { ...special, active: !special.active }
    try {
      const response = await fetch('/api/admin/weekly-specials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (response.ok) {
        setSpecials(prev => prev.map(s => s.id === id ? updated : s))
      }
    } catch (error) {
      console.error('Failed to toggle weekly special:', error)
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && editingSpecial) {
      setEditingSpecial({
        ...editingSpecial,
        features: [...editingSpecial.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    if (editingSpecial) {
      setEditingSpecial({
        ...editingSpecial,
        features: editingSpecial.features.filter((_, i) => i !== index)
      })
    }
  }

  return (
    <ProtectedAdmin>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Weekly Specials</h1>
            <p className="text-gray-400 mt-1">Manage recurring weekly promotions like $10 Dance Nights</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadSpecials}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-luxury-card text-gray-300 rounded-sm hover:text-gold-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => {
                setEditingSpecial(emptySpecial)
                setIsCreating(true)
              }}
              className="bg-gold-500 text-black font-semibold py-3 px-6 rounded-sm transition-all duration-300 hover:bg-gold-400 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Weekly Special
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="luxury-card p-12 text-center">
            <RefreshCw size={48} className="mx-auto mb-4 text-gold-500 animate-spin" />
            <p className="text-gray-400">Loading weekly specials...</p>
          </div>
        ) : (
          <>
            {/* Specials Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {specials.map(special => (
                <div
                  key={special.id}
                  className={`luxury-card overflow-hidden ${!special.active ? 'opacity-50' : ''}`}
                >
                  {special.image && (
                    <div className="aspect-video relative">
                      <img
                        src={special.image}
                        alt={special.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-gold-500 text-black text-sm font-bold rounded">
                          Every {special.day}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{special.title}</h3>
                        {!special.image && (
                          <p className="text-gold-500 text-sm">Every {special.day}</p>
                        )}
                        <p className="text-gray-400 text-sm">{special.time}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingSpecial(special)
                            setIsCreating(false)
                          }}
                          className="p-2 text-gray-400 hover:text-gold-500 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(special.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{special.description}</p>

                    <ul className="space-y-2 mb-4">
                      {special.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300 text-sm">
                          <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => toggleActive(special.id)}
                      className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                        special.active
                          ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                          : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                      }`}
                    >
                      {special.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {specials.length === 0 && (
              <div className="luxury-card p-12 text-center">
                <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">No weekly specials created yet.</p>
                <p className="text-gray-500 text-sm mt-1">
                  Add recurring promotions like $10 Dance Nights or themed evenings.
                </p>
              </div>
            )}
          </>
        )}

        {/* Edit Modal */}
        {editingSpecial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="luxury-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-luxury-border flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {isCreating ? 'Create Weekly Special' : 'Edit Weekly Special'}
                </h2>
                <button
                  onClick={() => {
                    setEditingSpecial(null)
                    setIsCreating(false)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={editingSpecial.title}
                    onChange={e => setEditingSpecial({ ...editingSpecial, title: e.target.value })}
                    className="form-input"
                    placeholder="$10 Dance Nights"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Day(s)</label>
                    <select
                      value={editingSpecial.day}
                      onChange={e => setEditingSpecial({ ...editingSpecial, day: e.target.value })}
                      className="form-input"
                    >
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Time</label>
                    <input
                      type="text"
                      value={editingSpecial.time}
                      onChange={e => setEditingSpecial({ ...editingSpecial, time: e.target.value })}
                      className="form-input"
                      placeholder="9 PM - 3 AM"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Image URL (optional)</label>
                  <div className="relative">
                    <Link size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="url"
                      value={editingSpecial.image || ''}
                      onChange={e => setEditingSpecial({ ...editingSpecial, image: e.target.value })}
                      className="form-input pl-12"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {editingSpecial.image && (
                  <div className="border border-luxury-border rounded-sm p-2">
                    <img
                      src={editingSpecial.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={editingSpecial.description}
                    onChange={e => setEditingSpecial({ ...editingSpecial, description: e.target.value })}
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Describe the weekly special..."
                  />
                </div>

                <div>
                  <label className="form-label">Features</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={e => setNewFeature(e.target.value)}
                      className="form-input flex-1"
                      placeholder="Add a feature"
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
                    {editingSpecial.features.map((feature, i) => (
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
                    id="active"
                    checked={editingSpecial.active}
                    onChange={e => setEditingSpecial({ ...editingSpecial, active: e.target.checked })}
                    className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-gold-500 focus:ring-gold-500"
                  />
                  <label htmlFor="active" className="text-gray-300">
                    Active (visible on website)
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-luxury-border flex justify-end gap-4">
                <button
                  onClick={() => {
                    setEditingSpecial(null)
                    setIsCreating(false)
                  }}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-gold flex items-center gap-2">
                  <Save size={18} />
                  {isCreating ? 'Create Special' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedAdmin>
  )
}
