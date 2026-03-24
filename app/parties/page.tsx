'use client'

import Link from 'next/link'
import { Crown, Users, Star, Sparkles, Phone, Calendar, Check, Wine } from 'lucide-react'

const packages = [
  {
    name: 'Bronze Package',
    subtitle: 'The Basics',
    price: 'Starting at $200',
    features: [
      'Reserved seating for your group',
      'VIP entrance (skip the line)',
      'Complimentary bottle of champagne',
      'Personal cocktail waitress',
      '2 dances for the guest of honor',
    ],
    highlight: false,
  },
  {
    name: 'Silver Package',
    subtitle: 'Most Popular',
    price: 'Starting at $400',
    features: [
      'Everything in Bronze, plus:',
      'Premium bottle service (choice of 2)',
      'VIP booth for 2 hours',
      '5 dances for the guest of honor',
      'Party favors & decorations',
      'Groom sash & tiara',
    ],
    highlight: true,
  },
  {
    name: 'Gold Package',
    subtitle: 'The Full Experience',
    price: 'Starting at $750',
    features: [
      'Everything in Silver, plus:',
      'Private VIP room for 3 hours',
      'Premium bottle service (choice of 3)',
      '10 dances for the guest of honor',
      'Limo pickup coordination',
      'Professional photos allowed',
      'Custom cake/food arrangements',
    ],
    highlight: false,
  },
]


export default function PartiesPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 rounded-full text-gold-500 text-sm font-medium mb-6">
            <Crown size={16} />
            Bachelor & Private Parties
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-gradient">Send Him Off</span>
            <br />
            <span className="text-white">In Style</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Planning a bachelor party, birthday celebration, or private event?
            We&apos;ll create an unforgettable experience for you and your crew.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+12199379750" className="btn-gold inline-flex items-center justify-center gap-2">
              <Phone size={18} />
              Call to Book: (219) 937-9750
            </a>
            <Link href="/contact" className="btn-outline-gold inline-flex items-center justify-center gap-2">
              <Calendar size={18} />
              Request Info
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* Why Choose Us */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-white">
            Why Party at Industrial Strip?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: '50+ Entertainers', desc: 'The largest roster in NWI' },
              { icon: Wine, title: 'Full Liquor Bar', desc: 'Premium spirits & bottle service' },
              { icon: Star, title: 'Full Contact', desc: 'The experience you\'re looking for' },
              { icon: Crown, title: 'VIP Treatment', desc: 'Make your night unforgettable' },
            ].map((item, i) => (
              <div key={i} className="luxury-card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <item.icon size={28} className="text-gold-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="px-4 py-16 bg-luxury-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-4 text-white">
            Party Packages
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose a package or let us create a custom experience. All packages can be tailored to your group size and preferences.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`luxury-card p-8 relative ${
                  pkg.highlight ? 'border-gold-500 gold-glow' : ''
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-gold-500 text-sm mb-4">{pkg.subtitle}</p>
                <p className="text-3xl font-bold text-white mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                      <Check size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+12199379750"
                  className={`block text-center py-3 rounded-sm font-semibold transition-colors ${
                    pkg.highlight
                      ? 'bg-gold-500 text-black hover:bg-gold-400'
                      : 'border border-gold-500 text-gold-500 hover:bg-gold-500/10'
                  }`}
                >
                  Book This Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-4 py-16 bg-luxury-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-white">
            What to Expect
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gold-500">Before You Arrive</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold">1.</span>
                  Call to reserve your package at least 48 hours in advance
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold">2.</span>
                  Confirm headcount and any special requests
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold">3.</span>
                  Arrive 15-30 min early to get settled
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gold-500">When You Arrive</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold">1.</span>
                  VIP entrance - skip the line
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold">2.</span>
                  Meet your dedicated host/hostess
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold">3.</span>
                  Get escorted to your reserved area
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center luxury-card p-12 border-gold-500/30">
          <Sparkles size={40} className="mx-auto mb-4 text-gold-500" />
          <h2 className="font-display text-3xl font-bold mb-4 text-white">
            Ready to Plan Your Party?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Call us now to reserve your date. We book up fast on weekends, so don&apos;t wait!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+12199379750" className="btn-gold inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
              <Phone size={20} />
              (219) 937-9750
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Open 7 days a week • 7 PM - 3 AM (4 AM Fri/Sat)
          </p>
        </div>
      </section>
    </div>
  )
}
