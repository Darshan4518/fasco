"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate=useRouter()
  const handleSubmit = (e: any) => {
    e.preventDefault()
    navigate.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        {/* Left Section */}
        <div
          className="hidden w-1/2 bg-cover bg-center lg:block"
          style={{ backgroundImage: 'url(/login.png)' }}
        />

        {/* Right Section */}
        <div className="w-full p-8 lg:w-1/2">
          {isLogin ? (
            <>
              <h2 className="mb-4 text-3xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="mb-6 text-sm text-gray-600">Sign in to your account</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-500 hover:underline"
                >
                  Register Now
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-4 text-3xl font-bold text-gray-800">Create Your Account</h2>
              <p className="mb-6 text-sm text-gray-600">Join us today!</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
                >
                  Register
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}