"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

// Dynamically import MapComponent to avoid SSR window issues
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function MapSection() {
  return (
    <section className="bg-[#fafafa]  w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[400px]">
        {/* LEFT COLUMN: Map Embed */}
        <div className="w-full lg:w-1/2 relative rounded-[32px] overflow-hidden shadow-sm h-[400px] bg-gray-100">
          <div className="absolute inset-0 z-0">
            <MapComponent />
          </div>

          {/* Overlay Pill & Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex flex-col items-center pointer-events-none z-10">
            {/* White Circle with House SVG */}
            <div className="relative flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-white rounded-full flex items-center justify-center shadow-md border-[5px] border-[#b4e674] relative z-10">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L2 12H5V20H19V12H22L12 3Z"
                    fill="#f0fdf4"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 20V14H14V20"
                    fill="#ea580c"
                    stroke="#ea580c"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Pointer Triangle */}
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[#b4e674] -mt-[3px] relative z-0 filter drop-shadow-sm"></div>
            </div>

            {/* Green Pill Label */}
            <div className="bg-[#b4e674] text-black px-5 py-2 rounded-full font-medium shadow-sm whitespace-nowrap mt-2 text-[15px] flex items-center gap-1">
              Dream Home 🤩
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          {/* Headline */}
          <h2 className="text-black text-4xl lg:text-[46px] font-semibold leading-[1.15] max-w-[480px] mb-6 tracking-tight">
            Discover Properties with the Best Value
          </h2>

          {/* Body Text */}
          <p className="text-gray-500 text-[16px] leading-[1.6] max-w-[440px] mb-8">
            From minimalist interiors to compact solutions, small spaces inspire
            big ideas, proving that you don&apos;t need much room.
          </p>

          {/* CTA Button */}
          <button className="bg-black text-white px-7 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Find Nearest Properties <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
