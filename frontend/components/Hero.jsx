'use client'
import { assets } from '@/assets/assets'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useClerk } from '@clerk/nextjs'

const Hero = () => {
  const router = useRouter()
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleShopNow = () => {
    if (mounted && user) {
      // Logged in: go to cart/shop page
      router.push('/cart')
    } else {
      // Logged out: open login
      openSignIn()
    }
  }

  return (
    <div className='mx-6'>
      <div className='relative flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
        {/* Green Box */}
        <div className='relative flex-1 flex flex-col bg-green-200 rounded-3xl min-h-[500px] group overflow-hidden'>
          
          {/* Content */}
          <div className='p-5 sm:p-16 z-10 relative flex flex-col justify-start h-full'>
            
            {/* News Badge */}
            <div className='inline-flex items-center gap-2 bg-green-300 text-green-600 pr-3 p-1 rounded-full text-xs sm:text-sm mb-4 max-w-max'>
              <span className='bg-green-600 px-2 py-0.5 rounded-full text-white text-xs'>NEWS</span> 
              Buy above 1000 & get Sugar Free  
              <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
            </div>

            {/* Scan Text */}
            <h2 className='text-3xl sm:text-5xl leading-[1.2] font-bold text-black max-w-xs sm:max-w-md mb-4'>
            Scan & Bag items as you shop
            </h2>

            {/* Spacer */}
            <div className='flex-1'></div>

            {/* Shop Button */}
            <div className='mb-6'>
              <button
                onClick={handleShopNow}
                className='bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition'
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <Image 
            className='absolute inset-0 w-full h-full object-contain' 
            src={assets.hero_model_img} 
            alt="Hero Model" 
            priority 
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-green-200 opacity-10'></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
