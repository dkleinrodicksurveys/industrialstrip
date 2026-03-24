import { Wine, Sparkles, Crown, GlassWater, Heart, Star, Clock } from 'lucide-react'
import Link from 'next/link'

const drinkCategories = [
  {
    icon: <Wine size={32} />,
    title: 'Premium Spirits',
    items: [
      { name: 'Grey Goose', price: '$12' },
      { name: 'Patron Silver', price: '$14' },
      { name: 'Johnnie Walker Black', price: '$15' },
      { name: 'Hennessy VS', price: '$14' },
    ],
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Champagne',
    items: [
      { name: 'Moët & Chandon', price: '$200' },
      { name: 'Veuve Clicquot', price: '$250' },
      { name: 'Dom Pérignon', price: '$450' },
      { name: 'Ace of Spades', price: 'Ask' },
    ],
  },
  {
    icon: <GlassWater size={32} />,
    title: 'Cocktails',
    items: [
      { name: 'Long Island', price: '$10' },
      { name: 'Margarita', price: '$9' },
      { name: 'Old Fashioned', price: '$12' },
      { name: 'Martini', price: '$11' },
    ],
  },
  {
    icon: <Crown size={32} />,
    title: 'Domestic Beer',
    items: [
      { name: 'Bud Light', price: '$5' },
      { name: 'Miller Lite', price: '$5' },
      { name: 'Coors Light', price: '$5' },
      { name: 'Budweiser', price: '$5' },
    ],
  },
]

const bottleService = [
  {
    name: 'Silver Package',
    price: '$300',
    includes: ['1 Premium Bottle', 'Mixers', 'VIP Seating', 'Dedicated Waitress'],
  },
  {
    name: 'Gold Package',
    price: '$500',
    includes: ['2 Premium Bottles', 'Mixers', 'VIP Seating', 'Dedicated Waitress', '2 Dance Tokens'],
    featured: true,
  },
  {
    name: 'Platinum Package',
    price: '$1000',
    includes: ['3 Premium Bottles', 'Champagne', 'VIP Section', 'Dedicated Waitress', '5 Dance Tokens', 'Champagne Room Access'],
  },
]

export default function BarPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-gradient">The Bar</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Full liquor service with premium spirits, champagne, and craft cocktails.
            Enjoy responsibly while our entertainers provide the show.
          </p>
        </div>
      </section>

      {/* Drink Menu */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drinkCategories.map((category, index) => (
              <div key={index} className="luxury-card p-6">
                <div className="w-14 h-14 mb-4 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-gold-500 font-medium">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* Bottle Service */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              <span className="text-gold-gradient">VIP Bottle Service</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Elevate your experience with our exclusive bottle service packages.
              Reserve your table and enjoy the royal treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bottleService.map((pkg, index) => (
              <div
                key={index}
                className={`luxury-card p-8 relative ${
                  pkg.featured ? 'border-gold-500 gold-glow' : ''
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-white mb-2">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold-gradient">{pkg.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={pkg.featured ? 'btn-gold w-full block text-center' : 'btn-outline-gold w-full block text-center'}
                >
                  Reserve Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* VIP Experiences */}
      <section id="vip" className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              <span className="text-gold-gradient">VIP Experiences</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Take your night to the next level with our premium entertainment options.
              Full contact, full friction - the experience you came for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* VIP Dances */}
            <div className="luxury-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Heart size={32} className="text-gold-500" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">VIP Dances</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gold-gradient">$10-15</span>
                <span className="text-gray-400 text-sm ml-2">per song</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li>Full contact lap dances</li>
                <li>Choose your entertainer</li>
                <li>Semi-private booths</li>
              </ul>
              <p className="text-gold-500 text-sm font-medium">
                Ask your entertainer or host
              </p>
            </div>

            {/* Body Slides */}
            <div className="luxury-card p-8 text-center border-gold-500/50 gold-glow">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                SIGNATURE EXPERIENCE
              </div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Star size={32} className="text-gold-500" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Body Slides</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gold-gradient">$100</span>
                <span className="text-gray-400 text-sm ml-2">10 minutes</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li>Our signature experience</li>
                <li>Private room</li>
                <li>Full body contact</li>
              </ul>
              <p className="text-gold-500 text-sm font-medium">
                Limited availability - ask now
              </p>
            </div>

            {/* Champagne Rooms */}
            <div className="luxury-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Clock size={32} className="text-gold-500" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Champagne Rooms</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gold-gradient">From $250</span>
                <span className="text-gray-400 text-sm ml-2">30 minutes</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li>Private room experience</li>
                <li>Choose your entertainer(s)</li>
                <li>Bottle service available</li>
              </ul>
              <p className="text-gold-500 text-sm font-medium">
                Reserve with your host
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="luxury-card p-6">
            <p className="text-gray-400 text-sm">
              <strong className="text-gold-500">Please drink responsibly.</strong> Must be 21+ with valid ID.
              Prices subject to change. Gratuity not included. All services are consensual between adults.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
