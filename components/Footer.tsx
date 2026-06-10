import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] w-full pt-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start px-6 lg:px-12 py-[80px] text-center lg:text-left gap-10 lg:gap-0">
          
          {/* Left Column */}
          <div className="lg:w-[60%] flex flex-col items-center lg:items-start">
            <h2 className="text-black text-[42px] lg:text-[56px] font-semibold leading-[1.1] tracking-tight max-w-[800px]">
              Discover Nature&apos;s <span className="text-gray-500">Wonders</span> <br className="hidden lg:block" />
              <span className="text-gray-500">with Expert Guidance</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="lg:w-[40%] flex justify-center lg:justify-end mt-4 lg:mt-2">
            <div className="text-left text-gray-800 text-[16px] font-medium leading-[1.6]">
              <p>12345, Gazipur, Dhaka, Road,</p>
              <p className="mb-4">Bangladesh.</p>
              <p className="text-black font-semibold tracking-wide">(+1)839-849-8483</p>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-200"></div>

        {/* MIDDLE ROW */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-[24px] gap-6 lg:gap-0">
          
          {/* Left Nav Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 lg:w-1/3">
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">Home</a>
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">About</a>
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">Properties</a>
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">Services</a>
          </div>

          {/* Center Logo */}
          <div className="lg:w-1/3 text-center flex justify-center">
            <span className="text-black font-semibold text-[20px] tracking-tight">
              EverGreen
            </span>
          </div>

          {/* Right Nav Links */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-8 lg:w-1/3">
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">Gallery</a>
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">FAQ</a>
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">Pricing</a>
            <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-black transition-colors">Contact</a>
          </div>

        </div>

        <div className="w-full border-t border-gray-200"></div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-[28px] gap-4 lg:gap-0">
          <p className="text-gray-700 font-medium text-[14px] text-center lg:text-left">
            © 2025 EverGreen. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-gray-700 font-medium text-[14px]">
            <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
