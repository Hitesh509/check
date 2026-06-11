'use client'
import React from 'react'
import Navbar from '@/components/Navbar'

export default function QuickTipPage() {
  const tips = [
    "Check the product details before adding to your cart.",
    "Use the search bar to quickly find items.",
    "Scan items directly using your camera for faster checkout.",
    "Refer to the Store Map to locate products easily.",
    "Keep an eye on promotions and discounts for savings."
  ];

  return (
    <>
      {/* Navbar on top */}
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6 pt-24">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center">
          Quick Tips
        </h1>

        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Here are some helpful tips to make your shopping experience faster and easier.
        </p>

        <div className="w-full max-w-3xl space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <span className="text-green-600 font-bold text-xl">{index + 1}.</span>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
