'use client'
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar'; // import your navbar component

export default function StoreMapPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar at the top */}
      <Navbar />

      {/* Page content */}
      <div className="flex flex-col items-center justify-center p-6 mt-6">
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">
          Store Map
        </h1>
        
        <p className="text-gray-600 mb-6 text-center max-w-2xl">
          Welcome to our store! Here is a visual guide of the store layout to help you navigate easily.
        </p>

        <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/store-map.jpg"   // public folder path
            alt="Store Map"
            width={1200}           // Adjust according to your image
            height={600}           // Adjust according to your image
            className="object-cover w-full h-auto"
            priority
          />
        </div>

      </div>
    </div>
  )
}
