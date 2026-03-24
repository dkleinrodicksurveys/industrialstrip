'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function AgeVerification() {
  const [verified, setVerified] = useState<boolean | null>(null)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    // Check if user has already verified
    const isVerified = localStorage.getItem('age-verified')
    if (isVerified === 'true') {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }, [])

  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true')
    setVerified(true)
  }

  const handleDeny = () => {
    setDenied(true)
  }

  // Still loading
  if (verified === null) {
    return null
  }

  // Already verified
  if (verified) {
    return null
  }

  // User denied being 21+
  if (denied) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            You must be 21 years or older to enter this site.
          </p>
          <a
            href="https://www.google.com"
            className="btn-outline-gold"
          >
            Leave Site
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="luxury-card max-w-md w-full p-8 text-center border-gold-500/50">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/e00832db-3bd0-456b-b041-fd76282cebc3/Logo.png?format=500w"
            alt="Industrial Strip"
            width={180}
            height={60}
            className="h-14 w-auto mx-auto"
          />
        </div>

        {/* Warning Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold-500/10 border-2 border-gold-500 flex items-center justify-center">
          <span className="text-gold-500 font-bold text-3xl">21+</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Age Verification Required
        </h2>

        <p className="text-gray-400 mb-6">
          This website contains adult content and is intended for individuals 21 years of age or older.
          By entering, you confirm that you are of legal age.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleVerify}
            className="btn-gold w-full py-3 text-lg"
          >
            I am 21 or Older - Enter
          </button>
          <button
            onClick={handleDeny}
            className="w-full py-3 text-gray-400 hover:text-white transition-colors"
          >
            I am Under 21 - Exit
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-6">
          By entering this site, you agree to our terms of service.
          Valid ID is required at the door.
        </p>
      </div>
    </div>
  )
}
