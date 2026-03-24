'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/bar', label: 'The Bar' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-black/95 backdrop-blur-sm border-b border-luxury-border">
      {/* Marquee Banner */}
      <div className="bg-gold-500 text-black py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="mx-8 font-semibold text-sm tracking-widest">
            INDUSTRIAL STRIP &nbsp;•&nbsp; Full Friction &nbsp;•&nbsp; Full Contact &nbsp;•&nbsp; Full Liquor &nbsp;•&nbsp;
          </span>
          <span className="mx-8 font-semibold text-sm tracking-widest">
            INDUSTRIAL STRIP &nbsp;•&nbsp; Full Friction &nbsp;•&nbsp; Full Contact &nbsp;•&nbsp; Full Liquor &nbsp;•&nbsp;
          </span>
          <span className="mx-8 font-semibold text-sm tracking-widest">
            INDUSTRIAL STRIP &nbsp;•&nbsp; Full Friction &nbsp;•&nbsp; Full Contact &nbsp;•&nbsp; Full Liquor &nbsp;•&nbsp;
          </span>
          <span className="mx-8 font-semibold text-sm tracking-widest">
            INDUSTRIAL STRIP &nbsp;•&nbsp; Full Friction &nbsp;•&nbsp; Full Contact &nbsp;•&nbsp; Full Liquor &nbsp;•&nbsp;
          </span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/e00832db-3bd0-456b-b041-fd76282cebc3/Logo.png?format=500w"
              alt="Industrial Strip"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors duration-200 animated-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-gold-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-luxury-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-gold-500 hover:bg-luxury-card transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
