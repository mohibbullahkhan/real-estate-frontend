import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[1200px] bg-white rounded-[40px] shadow-sm border border-gray-100 flex flex-col lg:flex-row overflow-hidden min-h-[700px]">
          
          {/* Left: Image Cover */}
          <div className="hidden lg:block lg:w-1/2 relative p-4">
            <div className="w-full h-full rounded-[32px] overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" 
                alt="Luxury real estate interior" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/25" />

              {/* Floating Pill Tag */}
              <div className="absolute top-8 left-8 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-xl">🏡</span>
                <span className="text-black font-semibold text-[14px]">Join 10,000+ buyers</span>
              </div>

              <div className="absolute bottom-12 left-12 text-white max-w-sm">
                <h2 className="text-4xl font-semibold mb-4 leading-tight">Start Your Property Journey Today.</h2>
                <p className="text-white/80">Create an account and unlock exclusive listings tailored just for you.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
            <div className="max-w-[420px] w-full mx-auto">
              <h2 className="text-black text-[36px] font-semibold tracking-tight mb-2">Create Account</h2>
              <p className="text-gray-500 mb-10">Fill in your details to get started for free.</p>

              <form className="flex flex-col gap-5">
                {/* Name Row */}
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (000) 000-0000" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input 
                    type="password" 
                    placeholder="Create a strong password" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 mt-1">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1 w-4 h-4 accent-black cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-black font-medium hover:underline">Terms & Conditions</a>
                    {" "}and{" "}
                    <a href="#" className="text-black font-medium hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <button 
                  type="button"
                  className="w-full bg-black text-white rounded-full py-4 font-semibold text-[16px] hover:bg-gray-800 transition-colors mt-2"
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-gray-100"></div>
                  <span className="text-gray-400 text-sm">or</span>
                  <div className="flex-1 h-px bg-gray-100"></div>
                </div>

                {/* Google Sign Up */}
                <button 
                  type="button"
                  className="w-full bg-[#fafafa] border border-gray-200 text-gray-700 rounded-full py-3.5 font-medium text-[15px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>

              </form>

              <p className="text-center text-gray-500 mt-8">
                Already have an account?{" "}
                <Link href="/signin" className="text-black font-semibold hover:underline">Sign in</Link>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
