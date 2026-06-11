'use client';
import { XIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [coupon, setCoupon] = useState('');

  // ✅ Handle Coupon
  const handleCouponCode = async (event) => {
    event.preventDefault();
    if (couponCodeInput.trim().toUpperCase() === 'DISCOUNT10') {
      setCoupon({
        code: 'DISCOUNT10',
        discount: 10,
        description: '10% off applied!',
      });
      toast.success('Coupon applied successfully!', { duration: 2000 });
    } else {
      toast.error('Invalid coupon code!', { duration: 2000 });
    }
  };

  // ✅ Handle Order Placement
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Done successfully!');
        router.push('/thankyou');
      }, 2000);
    });
  };

  // ✅ Custom dismissible toast (no redirecting message)
  const showSuccessToast = (msg) => {
    const toastId = toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4`}
      >
        <span className="text-sm font-medium">{msg}</span>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="text-white hover:text-gray-200 transition"
        >
          <XIcon size={16} />
        </button>
      </div>
    ), { duration: 4000 });
  };

  return (
    <>
      {/* Toast container */}
      <Toaster position="top-center" />

      <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200 text-slate-600 text-sm rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
          Payment Summary
        </h2>

        {/* Payment Method */}
        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-3">Select Payment Method</p>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                id="COD"
                name="payment"
                onChange={() => setPaymentMethod('COD')}
                checked={paymentMethod === 'COD'}
                className="accent-green-600"
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                id="STRIPE"
                name="payment"
                onChange={() => setPaymentMethod('STRIPE')}
                checked={paymentMethod === 'STRIPE'}
                className="accent-green-600"
              />
              <span>Stripe Payment</span>
            </label>
          </div>
        </div>

        {/* Summary Section */}
        <div className="py-6 border-y border-slate-200 text-slate-500">
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-1">
              <p>Subtotal:</p>
              <p>Shipping:</p>
              {coupon && <p>Coupon:</p>}
            </div>
            <div className="flex flex-col gap-1 text-right font-medium">
              <p>{currency}{totalPrice.toLocaleString()}</p>
              <p>Free</p>
              {coupon && (
                <p>-{currency}{(coupon.discount / 100 * totalPrice).toFixed(2)}</p>
              )}
            </div>
          </div>

          {/* Coupon Input */}
          {!coupon ? (
            <form onSubmit={handleCouponCode} className="flex justify-center gap-3 mt-3">
              <input
                onChange={(e) => setCouponCodeInput(e.target.value)}
                value={couponCodeInput}
                type="text"
                placeholder="Enter Coupon Code"
                className="border border-slate-400 p-2 rounded w-full outline-none"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 active:scale-95 transition-all"
              >
                Apply
              </button>
            </form>
          ) : (
            <div className="w-full flex items-center justify-center gap-2 text-xs mt-2">
              <p>
                Code: <span className="font-semibold ml-1">{coupon.code.toUpperCase()}</span>
              </p>
              <p>{coupon.description}</p>
              <XIcon
                size={18}
                onClick={() => setCoupon('')}
                className="hover:text-red-600 transition cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between py-6 text-lg font-medium text-slate-700">
          <p>Total:</p>
          <p>
            {currency}
            {coupon
              ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2)
              : totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Place Order */}
        <button
          onClick={(e) => {
            toast.promise(handlePlaceOrder(e), {
              loading: 'Placing Order...',
              success: (msg) => {
                showSuccessToast(msg); //  Only this popup now
                return ''; //  No "Redirecting..." message
              },
              error: 'Error placing order.',
            });
          }}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 active:scale-95 transition-all font-medium"
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
