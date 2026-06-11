'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle, Phone, Printer, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const router = useRouter();
  const { signOut } = useClerk(); // Clerk logout

  useEffect(() => {
    const randomId = 'ORD' + Math.floor(Math.random() * 1000000);
    setOrderId(randomId);
    setTotalAmount('₹' + (Math.random() * 500 + 200).toFixed(2));
  }, []);

  const handlePrintClick = () => {
    toast.success('Collect your receipt from the counter 🛒', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('cart');
      router.replace('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <Toaster />
{/* Image in rectangle */}
              <div className="mb-6 w-full max-w-md shadow-lg w-full h-f flex items-center justify-center bg-white rounded-lg overflow-hidden">
                
                
              </div>

      <CheckCircle className="text-green-600 w-20 h-20 mb-6 animate-bounce" />

      <h1 className="text-4xl font-bold text-green-700 mb-3 text-center">
        Thanks for Shopping!
      </h1>
      <p className="text-slate-600 mb-6 text-center text-lg">
        You’ve successfully checked out your groceries 🛒
      </p>

      <div className="bg-green-100 border border-green-300 rounded-lg p-6 mb-8 max-w-md text-green-800 text-center space-y-2">
        <p className="flex items-center justify-center gap-2 font-medium">
          <Phone size={16} /> Your digital receipt is on its way to your phone 📱
        </p>
        <p className="text-sm">
          You’ve grabbed your groceries successfully! 
        </p>
        <p className="text-sm">
          Keep your receipt handy for any queries at the counter 📝
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handlePrintClick}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
        >
          <Printer size={18} /> Print Receipt
        </button>

        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium flex items-center justify-center"
        >
          <LogOut size={18} /> Shop Again
        </button>
      </div>
    </div>
  );
}
