'use client'

import { useState } from 'react'
import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Plus, Edit2, Trash2, Tag, X, Save, DollarSign } from 'lucide-react'

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

const initialPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Private Dance',
    price: '$10-15',
    unit: 'per song',
    description: 'Full contact, full friction private entertainment in a booth.',
    features: ['Full contact', 'Full friction', 'Private booth'],
    featured: false,
    active: true,
  },
  {
    id: '2',
    title: 'Body Slide',
    price: '$100',
    unit: '10 minutes',
    description: 'Our most popular VIP experience.',
    features: ['Intimate experience', 'Premium service', 'Private room'],
    featured: true,
    active: true,
  },
  {
    id: '3',
    title: 'Champagne Room',
    price: '$250+',
    unit: '30 minutes',
    description: 'The ultimate VIP experience with privacy and bottle service.',
    features: ['Ultimate privacy', 'VIP treatment', 'Bottle service included'],
    featured: false,
    active: true,
  },
]

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions)
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

  const handleSave = async () => {
    if (!editingPromo) return

    if (isCreating) {
      const newPromo = {
        ...editingPromo,
        id: Date.now().toString(),
      }
      setPromotions(prev => [...prev, newPromo])
    } else {
      setPromotions(prev => prev.map(p => p.id === editingPromo.id ? editingPromo : p))
    }

    setEditingPromo(null)
    setIsCreating(false)
  }

  const handleDelete = (id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id))
  }

  const toggleActive = (id: string) => {
    setPromotions(prev => prev.map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    ))
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
            <h1 className="text-3xl font-bold text-white">Promotions</h1>
            <p className="text-gray-400 mt-1">Manage VIP packages and special offers</p>
          </div>
          <button
            onClick={() => {
              setEditingPromo(emptyPromo)
              setIsCreating(true)
            }}
            className="btn-gold flex items-center gap-2"
          >
            <Plus size={18} />
            Add Promotion
          </button>
        </div>

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
                      onKeyPress={e => e.key === 'Enter' && addFeature()}
                    />
                    <button
                      onClick={addFeature}
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
