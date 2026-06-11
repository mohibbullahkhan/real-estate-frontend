"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PropertyGallerySlider({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = index * container.clientWidth;
    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-[32px] font-bold text-black tracking-tight">Property Gallery</h2>
        
        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Next image"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {images.map((img, i) => (
          <div key={i} className="relative w-full min-w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden snap-center shrink-0 group">
            <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            
            {/* Image Counter Badge */}
            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium z-10">
              {i + 1} / {images.length}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
         <p className="text-sm text-gray-400 font-medium">Use buttons, swipe, or scroll to view gallery</p>
      </div>
    </div>
  );
}
