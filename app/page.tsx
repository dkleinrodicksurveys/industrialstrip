import Link from 'next/link'
import { Calendar, Star, Wine, Users, MapPin, Clock, Car, CreditCard, Phone } from 'lucide-react'
import FeaturedEvent from '@/components/FeaturedEvent'
import WeeklySpecials from '@/components/WeeklySpecials'

export default function Home() {
  return (
    <div className="pt-28">
      {/* Featured Event Banner */}
      <FeaturedEvent />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with club image */}
        <div className="absolute inset-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/657287ff-ccb0-4e5b-9d5b-22cb2fcdb9bb/Club+Outside+night.png"
            alt="Industrial Strip Club"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-luxury-black/60 to-luxury-black/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gold-gradient">Industrial</span>
            <span className="text-white"> Strip</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            Chicagoland&apos;s Premier Gentlemen&apos;s Club
          </p>
          <p className="text-gold-500 text-lg tracking-widest mb-10 font-medium">
            FULL FRICTION • FULL CONTACT • FULL LIQUOR
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="btn-gold">
              View Gallery
            </Link>
            <Link href="/events" className="btn-outline-gold">
              Upcoming Events
            </Link>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: 'VIP Experience',
                description: 'Private dances starting at $10/song with full contact entertainment'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: '50+ Entertainers',
                description: 'The largest roster in Northwest Indiana'
              },
              {
                icon: <Wine className="w-8 h-8" />,
                title: 'Full Bar',
                description: 'Premium bottle service and craft cocktails available'
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: 'Special Events',
                description: 'Weekly themed nights and holiday celebrations'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="luxury-card p-6 text-center group hover:gold-glow transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Specials */}
      <WeeklySpecials />

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">VIP Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the ultimate in adult entertainment with our premium offerings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Private Dance',
                price: '$10-15',
                unit: 'per song',
                features: ['Full contact', 'Full friction', 'Private booth'],
              },
              {
                title: 'Body Slide',
                price: '$100',
                unit: '10 minutes',
                features: ['Intimate experience', 'Premium service', 'Private room'],
                featured: true,
              },
              {
                title: 'Champagne Room',
                price: '$250+',
                unit: '30 minutes',
                features: ['Ultimate privacy', 'VIP treatment', 'Bottle service included'],
              },
            ].map((tier, index) => (
              <div
                key={index}
                className={`luxury-card p-8 relative ${
                  tier.featured ? 'border-gold-500 gold-glow' : ''
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2 text-white">{tier.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold-gradient">{tier.price}</span>
                  <span className="text-gray-400 text-sm ml-2">/ {tier.unit}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={tier.featured ? 'btn-gold w-full block text-center' : 'btn-outline-gold w-full block text-center'}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Our Entertainers</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet some of our beautiful dancers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/73be230f-6ae2-4f3d-8a10-6a2c4d03e7ce/Photoroom_20251209_134627.JPG',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/8845f740-90c3-4509-b165-47d5c0413d73/IMG_6066.JPG',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/c120973f-6d2b-4453-8da3-aad6847911b5/IMG_5196.jpg',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/f34a1aaf-6de7-4ecd-8238-4789972e1f3d/Photoroom_20240423_013422.jpg',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/ad009cc3-247a-4335-b6c3-6e39445eaba9/_Cinnamon+1.jpg',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/ef61e990-68df-4aaf-9292-6fdb8a309a06/BG-10.JPG',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/f36a7a05-9eb5-45ab-9b27-efe7a42a29bf/DSC04281-Edit.jpg',
              'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/900a2d31-c2e0-49d0-acad-8218c56906a7/IMG_5349.JPG',
            ].map((url, index) => (
              <div key={index} className="aspect-square relative luxury-card overflow-hidden group">
                <img
                  src={url}
                  alt="Entertainment"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/gallery" className="btn-outline-gold">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* Plan Your Visit Section */}
      <section className="py-20 px-4 bg-luxury-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Plan Your Visit</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know before you come
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Location */}
            <div className="luxury-card p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <MapPin size={24} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <a
                href="https://maps.google.com/?q=3626+Calumet+Ave+Hammond+IN+46320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
              >
                3626 Calumet Ave<br />
                Hammond, IN 46320
              </a>
              <p className="text-gold-500 text-xs mt-2">Less than 1 mile from Chicago!</p>
            </div>

            {/* Hours */}
            <div className="luxury-card p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Clock size={24} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Hours</h3>
              <div className="text-gray-400 text-sm space-y-1">
                <p>Mon - Thu: <span className="text-white">7 PM - 3 AM</span></p>
                <p>Fri - Sat: <span className="text-white">7 PM - 4 AM</span></p>
                <p>Sunday: <span className="text-white">7 PM - 3 AM</span></p>
              </div>
            </div>

            {/* Parking & Entry */}
            <div className="luxury-card p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Car size={24} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Parking & Entry</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-gold-500">•</span> Free parking lot
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-500">•</span> 21+ with valid ID
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-500">•</span> Cover varies by night
                </li>
              </ul>
            </div>

            {/* Payment */}
            <div className="luxury-card p-6">
              <div className="w-12 h-12 mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
                <CreditCard size={24} className="text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Payment</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-gold-500">•</span> ATM on-site
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-500">•</span> Cash preferred
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-500">•</span> Cards accepted at bar
                </li>
              </ul>
            </div>
          </div>

          {/* First Timer Tips */}
          <div className="luxury-card p-8 border-gold-500/30">
            <h3 className="text-xl font-semibold text-gold-500 mb-6 text-center">First Time? Here&apos;s What to Expect</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gold-500 mb-2">1</div>
                <h4 className="font-semibold text-white mb-2">Arrive & Check In</h4>
                <p className="text-gray-400 text-sm">Show your ID at the door, pay cover, and head to the bar or find a seat near the stage.</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-500 mb-2">2</div>
                <h4 className="font-semibold text-white mb-2">Get Comfortable</h4>
                <p className="text-gray-400 text-sm">Order drinks, tip the stage dancers, and entertainers will approach you for private dances.</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-500 mb-2">3</div>
                <h4 className="font-semibold text-white mb-2">Enjoy the Experience</h4>
                <p className="text-gray-400 text-sm">Dances are $10-15/song. Ask about VIP rooms and champagne rooms for more privacy.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="tel:+12199379750" className="btn-gold inline-flex items-center gap-2">
              <Phone size={18} />
              Questions? Call (219) 937-9750
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready for an <span className="text-gold-gradient">Unforgettable Night</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join us for Chicagoland&apos;s finest adult entertainment experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=3626+Calumet+Ave+Hammond+IN+46320"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Get Directions
            </a>
            <Link href="/jobs" className="btn-outline-gold">
              Now Hiring
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
