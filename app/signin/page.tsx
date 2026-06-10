import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[1200px] bg-white rounded-[40px] shadow-sm border border-gray-100 flex flex-col lg:flex-row overflow-hidden min-h-[700px]">
          
          {/* Left: Image Cover */}
          <div className="hidden lg:block lg:w-1/2 relative p-4">
            <div className="w-full h-full rounded-[32px] overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" 
                alt="Luxury real estate" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-12 left-12 text-white max-w-sm">
                <h2 className="text-4xl font-semibold mb-4 leading-tight">Welcome back to EverGreen.</h2>
                <p className="text-white/80">Discover your next dream property with us.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
            <div className="max-w-[400px] w-full mx-auto">
              <h2 className="text-black text-[36px] font-semibold tracking-tight mb-2">Sign In</h2>
              <p className="text-gray-500 mb-10">Enter your details to access your account.</p>

              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Forgot Password?</a>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                <button 
                  type="button"
                  className="w-full bg-black text-white rounded-full py-4 font-semibold text-[16px] hover:bg-gray-800 transition-colors mt-4"
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-gray-500 mt-8">
                Don&apos;t have an account? <Link href="/signup" className="text-black font-semibold hover:underline">Sign up</Link>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
