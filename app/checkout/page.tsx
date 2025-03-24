/* pages/checkout.tsx */
'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Checkout() {
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Contact</h2>
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <p className="mt-2 text-sm text-gray-600">
            Have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Create Account
            </a>
          </p>
        </div>

        {/* Delivery Section */}
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Delivery</h2>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <select
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option>Country / Region</option>
            <option>United States</option>
            <option>Canada</option>
            <option>India</option>
          </select>
          <input
            type="text"
            placeholder="First Name"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full col-span-2 rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={() => setSaveInfo(!saveInfo)}
            className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Save this info for future</label>
        </div>

        {/* Payment Section */}
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Payment</h2>
        <div className="mb-6">
          <select
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>PayPal</option>
          </select>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Security Code"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Expiration Date"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Card Holder Name"
            className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={() => setSaveInfo(!saveInfo)}
            className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Save this info for future</label>
        </div>

       <Link href={"/"}>
       <button
          type="submit"
          className="w-full rounded-lg bg-black p-3 text-white hover:bg-gray-800"
        >
          Pay Now
        </button>
       </Link>
      </div>
    </div>
  );
}