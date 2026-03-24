import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AgeVerification from '@/components/AgeVerification'

export const metadata: Metadata = {
  title: 'Industrial Strip | Full Friction • Full Contact • Full Liquor',
  description: 'Northwest Indiana\'s premier gentlemen\'s club in Hammond, featuring full contact entertainment, VIP experiences, and full bar service. Minutes from Chicago.',
  keywords: 'strip club, gentlemen club, Hammond, Indiana, Chicago, Chicagoland, nightlife, entertainment, VIP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-luxury-black min-h-screen flex flex-col">
        <AgeVerification />
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
