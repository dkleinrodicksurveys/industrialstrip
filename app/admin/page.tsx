'use client'

import ProtectedAdmin from '@/components/ProtectedAdmin'
import { Image as ImageIcon, Calendar, Tag, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Photos', value: '24', icon: <ImageIcon size={24} />, href: '/admin/photos' },
  { label: 'Active Events', value: '4', icon: <Calendar size={24} />, href: '/admin/events' },
  { label: 'Promotions', value: '3', icon: <Tag size={24} />, href: '/admin/promotions' },
]

const quickActions = [
  { label: 'Upload Photos', href: '/admin/photos', description: 'Add new images to the gallery' },
  { label: 'Create Event', href: '/admin/events', description: 'Add a new event or promotion' },
  { label: 'Manage Promotions', href: '/admin/promotions', description: 'Update VIP packages and specials' },
]

export default function AdminDashboard() {
  return (
    <ProtectedAdmin>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here&apos;s what&apos;s happening with your site.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Link
              key={index}
              href={stat.href}
              className="luxury-card p-6 flex items-center gap-4 hover:border-gold-500/50 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                {stat.icon}
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="luxury-card p-6 hover:border-gold-500/50 transition-all duration-200 group"
              >
                <h3 className="font-semibold text-white group-hover:text-gold-500 transition-colors mb-1">
                  {action.label}
                </h3>
                <p className="text-gray-500 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
          <div className="luxury-card p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-white">Upload your photos</h4>
                  <p className="text-gray-500 text-sm">
                    Go to the Photos section to upload images of your venue, dancers, and events.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-white">Set up your events</h4>
                  <p className="text-gray-500 text-sm">
                    Add your regular weekly events and any special occasions in the Events section.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-white">Update promotions</h4>
                  <p className="text-gray-500 text-sm">
                    Configure your VIP packages and special promotions in the Promotions section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedAdmin>
  )
}
