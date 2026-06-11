'use client';

import { useEffect, useState } from 'react';
import { PackageIcon, ScanLine, Heart, Info, MapPin } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useUser, useClerk, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const cartCount = useSelector(state => state.cart.total);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  }

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img className="h-10 w-auto" />
            <span className="text-3xl font-bold text-slate-700">
              <span className="text-green-600">Cart</span>IQ<span className="text-green-600 text-5xl leading-0">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6 lg:gap-10 text-slate-700 font-semibold">

            {mounted && user ? (
              <>
                {/* Favourites */}
                <Link href="/shop" className="flex items-center gap-1 hover:text-green-600 transition">
                  <Heart size={16} className="text-green-600" />
                  Favourites
                </Link>

                {/* Scan / Cart */}
                <button
                  id="scanBtn"
                  onClick={() => router.push("/cart")}
                  className="relative flex items-center gap-3 text-slate-700 hover:text-green-600 transition"
                >
                  <ScanLine size={18} className="text-green-600" />
                  Scan
                  <span className="absolute -top-1 left-4 text-[8px] text-white bg-slate-600 w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>

                {/* Quick Tip */}
                <Link href="/quick" className="flex items-center gap-1 hover:text-green-600 transition">
                  <Info size={16} className="text-green-600" /> Quick Tip
                </Link>

                {/* StoreMap */}
                <Link href="/storemap" className="flex items-center gap-1 hover:text-green-600 transition">
                  <MapPin size={16} className="text-green-600"/> StoreMap
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <input
                    className="w-full bg-transparent outline-none placeholder-slate-600"
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                  />
                </form>

                {/* User Button */}
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<PackageIcon size={16} />}
                      label="My Orders"
                      onClick={() => router.push('/orders')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            ) : (
              // Only Login Button when logged out
              <button 
                onClick={openSignIn} 
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              >
                Get started
              </button>
            )}

          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden flex items-center gap-3">
            {mounted && user ? (
              <>
                <button
                  onClick={() => router.push("/cart")}
                  className="relative flex items-center gap-1 text-slate-700"
                >
                  <ScanLine size={18} className="text-green-600" />
                  <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>

                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<PackageIcon size={16} />}
                      label="My Orders"
                      onClick={() => router.push('/orders')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            ) : (
              <button onClick={openSignIn} className="px-6 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                Get started
              </button>
            )}
          </div>

        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  )
}

export default Navbar;
