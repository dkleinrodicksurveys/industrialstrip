'use client'

import { useState, useEffect } from 'react'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Plus, Edit2, Trash2, Tag, X, Save, DollarSign, RefreshCw } from 'lucide-react'

interface Promotion {
  id: string
  title: string
  price: string
  unit: string
  description: string
  features: string[]
  featured: boolean
  active: boolean
}

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  const emptyPromo: Promotion = {
    id: '',
    title: '',
    price: '',
    unit: '',
    description: '',
    features: [],
    featured: false,
    active: true,
  }

  useEffect(() => {
    loadPromotions()
  }, [])

  const loadPromotions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/promotions')
      if (response.ok) {
        const data = await response.json()
        setPromotions(data)
      }
    } catch (error) {
      console.error('Failed to load promotions:', error)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!editingPromo) return

    try {
      if (isCreating) {
        const response = await fetch('/api/admin/promotions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingPromo),
        })
        if (response.ok) {
          const newPromo = await response.json()
          setPromotions(prev => [...prev, newPromo])
        }
      } else {
        const response = await fetch('/api/admin/promotions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingPromo),
        })
        if (response.ok) {
          setPromotions(prev => prev.map(p => p.id === editingPromo.id ? editingPromo : p))
        }
      }
    } catch (error) {
      console.error('Failed to save promotion:', error)
    }

    setEditingPromo(null)
    setIsCreating(false)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/promotions?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setPromotions(prev => prev.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete promotion:', error)
    }
  }

  const toggleActive = async (id: string) => {
    const promo = promotions.find(p => p.id === id)
    if (!promo) return

    const updated = { ...promo, active: !promo.active }
    try {
      const response = await fetch('/api/admin/promotions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (response.ok) {
        setPromotions(prev => prev.map(p => p.id === id ? updated : p))
      }
    } catch (error) {
      console.error('Failed to toggle promotion:', error)
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && editingPromo) {
      setEditingPromo({
        ...editingPromo,
        features: [...editingPromo.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    if (editingPromo) {
      setEditingPromo({
        ...editingPromo,
        features: editingPromo.features.filter((_, i) => i !== index)
      })
    }
  }

  return (
    <ProtectedAdmin>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">VIP Packages</h1>
            <p className="text-gray-400 mt-1">Manage VIP packages and special offers</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadPromotions}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-luxury-card text-gray-300 rounded-sm hover:text-gold-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => {
                setEditingPromo(emptyPromo)
                setIsCreating(true)
              }}
              className="bg-gold-500 text-black font-bold py-3 px-8 rounded-sm transition-all duration-300 hover:bg-gold-400 flex items-center gap-2 shadow-lg shadow-gold-500/50"
            >
              <Plus size={20} />
              ADD PACKAGE
            </button>
          </div>
        </div>

        {/* Quick Add Button */}
        <div className="bg-gold-500/10 border-2 border-gold-500 border-dashed rounded-lg p-6 text-center">
          <p className="text-gold-500 mb-3">Click below to create a new VIP package</p>
          <button
            onClick={() => {
              setEditingPromo(emptyPromo)
              setIsCreating(true)
            }}
            className="bg-gold-500 text-black font-bold py-4 px-12 rounded-sm text-lg hover:bg-gold-400 transition-all inline-flex items-center gap-3 shadow-xl"
          >
            <Plus size={24} />
            CREATE NEW PACKAGE
          </button>
        </div>

        {isLoading ? (
          <div className="luxury-card p-12 text-center">
            <RefreshCw size={48} className="mx-auto mb-4 text-gold-500 animate-spin" />
            <p className="text-gray-400">Loading promotions...</p>
          </div>
        ) : (
          <>
            {/* Promotions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map(promo => (
                <div
                  key={promo.id}
                  className={`luxury-card p-6 relative ${
                    promo.featured ? 'border-gold-500/50' : ''
                  } ${!promo.active ? 'opacity-50' : ''}`}
                >
                  {promo.featured && (
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-gold-500 text-black text-xs font-bold rounded">
                      FEATURED
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{promo.title}</h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingPromo(promo)
                          setIsCreating(false)
                        }}
                        className="p-2 text-gray-400 hover:text-gold-500 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gold-gradient">{promo.price}</span>
                    <span className="text-gray-400 text-sm ml-2">/ {promo.unit}</span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{promo.description}</p>

                  <ul className="space-y-2 mb-4">
                    {promo.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => toggleActive(promo.id)}
                    className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                      promo.active
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'bg-gray-500/10 text-gray-400 hover:bg-gray-500/20'
                    }`}
                  >
                    {promo.active ? 'Active' : 'Inactive'}
                  </button>
                </div>
              ))}
            </div>

            {promotions.length === 0 && (
              <div className="luxury-card p-12 text-center">
                <Tag size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">No promotions created yet.</p>
                <p className="text-gray-500 text-sm mt-1">
                  Add your first promotion to get started.
                </p>
              </div>
            )}
          </>
        )}

        {/* Edit Modal */}
        {editingPromo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="luxury-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-luxury-border flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {isCreating ? 'Create Promotion' : 'Edit Promotion'}
                </h2>
                <button
                  onClick={() => {
                    setEditingPromo(null)
                    setIsCreating(false)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="form-label">Promotion Title</label>
                  <input
                    type="text"
                    value={editingPromo.title}
                    onChange={e => setEditingPromo({ ...editingPromo, title: e.target.value })}
                    className="form-input"
                    placeholder="VIP Package Name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Price</label>
                    <div className="relative">
                      <DollarSign size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={editingPromo.price}
                        onChange={e => setEditingPromo({ ...editingPromo, price: e.target.value })}
                        className="form-input pl-10"
                        placeholder="$100 or $10-15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Unit</label>
                    <input
                      type="text"
                      value={editingPromo.unit}
                      onChange={e => setEditingPromo({ ...editingPromo, unit: e.target.value })}
                      className="form-input"
                      placeholder="per song, 10 minutes, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={editingPromo.description}
                    onChange={e => setEditingPromo({ ...editingPromo, description: e.target.value })}
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Describe the promotion..."
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
                    {editingPromo.features.map((feature, i) => (
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

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editingPromo.featured}
                      onChange={e => setEditingPromo({ ...editingPromo, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-gold-500 focus:ring-gold-500"
                    />
                    <label htmlFor="featured" className="text-gray-300">
                      Mark as featured (highlighted on homepage)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      checked={editingPromo.active}
                      onChange={e => setEditingPromo({ ...editingPromo, active: e.target.checked })}
                      className="w-5 h-5 rounded border-luxury-border bg-luxury-dark text-gold-500 focus:ring-gold-500"
                    />
                    <label htmlFor="active" className="text-gray-300">
                      Active (visible on website)
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-luxury-border flex justify-end gap-4">
                <button
                  onClick={() => {
                    setEditingPromo(null)
                    setIsCreating(false)
                  }}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-gold flex items-center gap-2">
                  <Save size={18} />
                  {isCreating ? 'Create Promotion' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedAdmin>
  )
}
