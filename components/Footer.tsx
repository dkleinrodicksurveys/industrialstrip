import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, MapPin, Phone, Clock, Mail, CreditCard, Car } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-luxury-dark border-t border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <Image
              src="https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/e00832db-3bd0-456b-b041-fd76282cebc3/Logo.png?format=500w"
              alt="Industrial Strip"
              width={150}
              height={50}
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Northwest Indiana&apos;s premier destination for upscale adult entertainment.
              Located in Hammond, just minutes from Chicago.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/industrialstrip/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-luxury-card border border-luxury-border flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/industrialstripbabes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-luxury-card border border-luxury-border flex items-center justify-center text-gray-400 hover:text-gold-500 hover:border-gold-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              Hours
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-gray-400">
                <span>Monday - Tuesday</span>
                <span className="text-white">7 PM - 3 AM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Wednesday</span>
                <span className="text-white">7 PM - 3 AM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Thursday</span>
                <span className="text-white">7 PM - 3 AM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Friday - Saturday</span>
                <span className="text-white">7 PM - 4 AM</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sunday</span>
                <span className="text-white">7 PM - 3 AM</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Events', href: '/events' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'The Bar', href: '/bar' },
                { label: 'VIP Services', href: '/bar#vip' },
                { label: 'Bachelor Parties', href: '/parties' },
                { label: 'Careers', href: '/jobs' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-500 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4 text-sm uppercase tracking-wider">
              Visit Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold-500" />
                <div>
                  <a
                    href="https://maps.google.com/?q=3626+Calumet+Ave+Hammond+IN+46320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gold-500 transition-colors"
                  >
                    3626 Calumet Ave<br />
                    Hammond, IN 46320
                  </a>
                  <p className="text-xs mt-0.5">Less than 1 mile from Chicago!</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-gold-500" />
                <a href="tel:+12199379750" className="hover:text-gold-500 transition-colors">
                  (219) 937-9750
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Car size={16} className="mt-0.5 flex-shrink-0 text-gold-500" />
                <span>Free Parking Available</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <CreditCard size={16} className="mt-0.5 flex-shrink-0 text-gold-500" />
                <span>ATM On-Site • Cards Accepted</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-luxury-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Industrial Strip. All rights reserved.
            </p>
            <p className="text-gold-500 text-sm font-semibold">
              21+ ONLY • Valid ID Required
            </p>
            <p className="text-gray-500 text-xs">
              Full Friction • Full Contact • Full Liquor
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
