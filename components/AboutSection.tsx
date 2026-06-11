"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const counters = statsRef.current.querySelectorAll<HTMLSpanElement>(".stat-num");
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + (Number.isInteger(target) ? Math.round(obj.val) : obj.val.toFixed(0)) + suffix;
            },
          });
        },
      });
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-10 lg:py-24">
        
        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
          {/* Left Headline */}
          <h2 className="text-black text-4xl lg:text-[44px] font-bold leading-[1.2] max-w-[500px]">
            Your primary home might begin to feel left out.
          </h2>
          
          {/* Right Video Card */}
          <div className="flex items-center gap-4 max-w-[320px]">
            <div className="relative w-[110px] h-[52px] rounded-full overflow-hidden shrink-0">
              <Image 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400" 
                alt="House thumbnail" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center pl-[2px] shadow-sm">
                  <Play className="w-3.5 h-3.5 text-black fill-black" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Each listing offers unique features, exceptional quality, and prime locations
            </p>
          </div>
        </div>

        {/* MIDDLE ROW */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Column 1: Large Image (50%) */}
          <div className="lg:w-1/2 flex flex-col relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800" 
                alt="Large modern house" 
                fill 
                className="object-cover"
              />
              
              {/* Overlapping Avatar Group */}
              <div className="absolute bottom-6 right-6 flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400" alt="Avatar 1" fill className="object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400" alt="Avatar 2" fill className="object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400" alt="Avatar 3" fill className="object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-black flex items-center justify-center relative z-10 text-white text-xs font-bold">
                  +2K
                </div>
              </div>
            </div>
          </div>

          {/* Columns 2 & 3 Combined (50%) */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Top Cards Row */}
            <div className="flex flex-col sm:flex-row gap-4 h-full">
              
              {/* Left Card */}
              <div className="flex-1 bg-[#fafafa] rounded-[32px] p-8 flex flex-col items-center text-center justify-center">
                <h3 className="text-[28px] font-medium leading-[1.2] text-black mb-5">
                  Big things can happen in small spaces.
                </h3>
                <p className="text-gray-500 text-[14px] mb-8 leading-relaxed px-2">
                  With thoughtful design and smart organization, you can maximize every inch, making room for creativity
                </p>
                <Link href="/properties">
                  <button className="border border-gray-200 bg-white text-black rounded-full px-8 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    Details
                  </button>
                </Link>
              </div>

              {/* Right Card */}
              <div className="flex-1 bg-[#fafafa] rounded-[32px] p-3 flex flex-col">
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-5">
                  <Image 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800" 
                    alt="Small modern house" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-center pb-3 mt-auto">
                  <h4 className="text-[18px] font-medium text-gray-600 mb-4">
                    Pricing Start at $256K
                  </h4>
                  <Link href="/properties">
                    <button className="bg-black text-white rounded-full px-6 py-3 text-[14px] font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                      Explore Properties <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Text and Arrows */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-6">
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-[340px]">
                Whether it&apos;s creating a cozy corner for relaxation or transforming a small area into a workspace
              </p>
              
              <div className="flex gap-3 shrink-0">
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* STATS ROW */}
        <div ref={statsRef} className="mt-20 w-full flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          
          <div className="flex flex-col items-center flex-1">
            <span className="stat-num text-black text-4xl lg:text-[52px] font-medium tracking-tight" data-target="100" data-suffix="%">0%</span>
            <span className="text-gray-500 text-[15px] mt-1">Satisfactions Clients</span>
          </div>

          <div className="hidden md:block w-[1px] h-14 bg-gray-200"></div>

          <div className="flex flex-col items-center flex-1">
            <span className="stat-num text-black text-4xl lg:text-[52px] font-medium tracking-tight" data-target="500" data-suffix="+">0+</span>
            <span className="text-gray-500 text-[15px] mt-1">Property sells</span>
          </div>

          <div className="hidden md:block w-[1px] h-14 bg-gray-200"></div>

          <div className="flex flex-col items-center flex-1">
            <span className="stat-num text-black text-4xl lg:text-[52px] font-medium tracking-tight" data-target="150" data-suffix="+">0+</span>
            <span className="text-gray-500 text-[15px] mt-1">Countries &amp; Cities</span>
          </div>

          <div className="hidden md:block w-[1px] h-14 bg-gray-200"></div>

          <div className="flex flex-col items-center flex-1">
            <span className="stat-num text-black text-4xl lg:text-[52px] font-medium tracking-tight" data-target="200" data-suffix="+">0+</span>
            <span className="text-gray-500 text-[15px] mt-1">Positive reviews</span>
          </div>

        </div>

      </div>
    </section>
  );
}
