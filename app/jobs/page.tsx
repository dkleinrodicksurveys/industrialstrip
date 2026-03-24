import { DollarSign, Clock, Shield, Star, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    icon: <DollarSign size={28} />,
    title: 'Top Earnings',
    description: 'Industry-leading earning potential with our premium clientele',
  },
  {
    icon: <Clock size={28} />,
    title: 'Flexible Schedule',
    description: 'Work when you want - day shifts, night shifts, or weekends only',
  },
  {
    icon: <Shield size={28} />,
    title: 'Safe Environment',
    description: '24/7 security and professional management that has your back',
  },
  {
    icon: <Star size={28} />,
    title: 'Premium Venue',
    description: 'Upscale atmosphere attracts respectful, high-spending guests',
  },
  {
    icon: <Users size={28} />,
    title: 'Supportive Team',
    description: 'Join a family of professionals who support each other',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Low House Fees',
    description: 'Keep more of what you earn with our dancer-friendly policies',
  },
]

const positions = [
  {
    title: 'Entertainers / Dancers',
    type: 'Full-time / Part-time',
    description: 'Join our team of professional entertainers. All body types welcome. Experience preferred but not required - we provide training.',
    requirements: ['Must be 18+', 'Valid ID required', 'Professional attitude', 'Reliable transportation'],
  },
  {
    title: 'Bartenders',
    type: 'Full-time / Part-time',
    description: 'Experienced bartenders wanted for our full-liquor bar. Must be efficient, personable, and able to handle a fast-paced environment.',
    requirements: ['Must be 21+', 'Bartending experience', 'TIPS certified', 'Customer service skills'],
  },
  {
    title: 'Waitstaff',
    type: 'Part-time',
    description: 'VIP waitresses and cocktail servers needed. Excellent earning potential with our generous clientele.',
    requirements: ['Must be 21+', 'Previous experience a plus', 'Outgoing personality', 'Professional appearance'],
  },
  {
    title: 'Security',
    type: 'Full-time',
    description: 'Professional security personnel to ensure safety of staff and guests. Must be able to handle situations professionally.',
    requirements: ['Must be 21+', 'Security experience required', 'Professional demeanor', 'Physical fitness'],
  },
]

export default function JobsPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold-gradient">Join Our Team</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join Chicagoland&apos;s
            premier gentlemen&apos;s club. Great pay, flexible hours, professional environment.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="luxury-card p-4 text-center group hover:border-gold-500/50 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-gray-500 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* Open Positions */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl font-bold mb-12 text-center">
            <span className="text-gold-gradient">Open Positions</span>
          </h2>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="luxury-card p-6 md:p-8 hover:border-gold-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{position.title}</h3>
                    <span className="text-gold-500 text-sm">{position.type}</span>
                  </div>
                  <Link href="/contact" className="btn-outline-gold text-sm py-2 px-6 w-fit">
                    Apply Now
                  </Link>
                </div>
                <p className="text-gray-300 mb-4">{position.description}</p>
                <div className="flex flex-wrap gap-2">
                  {position.requirements.map((req, i) => (
                    <span key={i} className="px-3 py-1 bg-luxury-black text-gray-400 text-xs rounded">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="luxury-card p-8 md:p-12 text-center border-gold-500/30">
            <h2 className="font-display text-3xl font-bold mb-4 text-white">
              Ready to Start Earning?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Walk-ins welcome during business hours. Bring valid ID and be ready for an audition.
              No experience necessary for dancers - we train!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                Contact Us
              </Link>
              <a
                href="tel:+12199379750"
                className="btn-outline-gold"
              >
                Call (219) 937-9750
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
