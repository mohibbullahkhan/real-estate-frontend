import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative w-full min-h-[320px] flex items-center justify-center py-[60px] px-5 md:py-20">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
          alt="Modern house exterior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="text-white text-[32px] md:text-[48px] font-bold leading-[1.2] max-w-[700px]">
          Ready to Make Your Dream Property a Reality?
        </h2>
        
        <p className="text-white text-[16px] opacity-80 mt-4 max-w-[500px]">
          Explore a curated selection of properties that align with your vision and goals.
        </p>
        
        <button className="bg-white text-black px-8 py-3 rounded-full font-medium mt-8 hover:bg-gray-100 transition-colors flex items-center gap-2 group">
          Get Started 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
    </section>
  );
}
