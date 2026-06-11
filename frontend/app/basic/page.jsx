"use client";

import React, { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-400">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-80">
        <h1 className="text-4xl font-bold mb-6 text-gray-800"> Waste Your Time ! </h1>
        <h1 className="text-2xl font-medium mb-4 text-gray-600">Time pass counter.</h1>
        <p className="text-3xl font-semibold mb-8 text-gray-700">{count}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={increase}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-200 shadow-md"
          >
            Increase
          </button>
          <button
            onClick={decrease}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-200 shadow-md"
          >
            Decrease
          </button>
        </div>
      </div>
    </div>
  );
}
