"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Image from "next/image";
import { useState } from "react";

export default function ProductPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  // Dummy product data (you can replace this with API or props)
  const product = {
    id: "p1",
    name: "Wireless Headphones",
    price: 1299,
    mrp: 1999,
    description: "High-quality wireless headphones with noise cancellation.",
    image: "/images/headphones.png", // Put a valid image in your /public/images folder
  };

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id }));
    setAdded(true);
  };

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
            className="rounded-lg"
          />
        </div>

        {/* Product Info */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h1>
        <p className="text-gray-500 mb-4">{product.description}</p>

        <div className="flex items-baseline gap-3 mb-6">
          <p className="text-2xl font-bold text-gray-800">
            {currency}{product.price}
          </p>
          <p className="text-gray-400 line-through">
            {currency}{product.mrp}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          id="personDetectedBtn"
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium text-lg transition active:scale-95"
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
