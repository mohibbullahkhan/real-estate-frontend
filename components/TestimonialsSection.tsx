"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 0,
      quote: "Working with this team was a pleasure. They understood our vision and helped us find a property that exceeded our expectations. We couldn't have done it without them!",
      name: "Sajibur Rahman",
      title: "UI UX Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      id: 1,
      quote: "The level of professionalism and dedication we experienced was unmatched. They negotiated the best price for our new home and made the entire process incredibly seamless.",
      name: "Emily Chen",
      title: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    {
      id: 2,
      quote: "Highly recommended! Their market knowledge is outstanding. They found us an amazing commercial space that perfectly fits our rapidly growing business needs.",
      name: "Marcus Johnson",
      title: "Tech Entrepreneur",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <section className="bg-white w-full py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <h2 className="text-black text-4xl lg:text-[40px] font-bold leading-[1.2] max-w-[380px]">
            What our clients say about us
          </h2>
          
          <div className="flex items-center gap-4">
            {/* Avatar Group */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Client 1" fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="Client 2" fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Client 3" fill className="object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Client 4" fill className="object-cover" />
              </div>
            </div>
            <span className="text-gray-500 text-sm font-medium">
              More than 500+<br />Client Reviews
            </span>
          </div>
        </div>

        {/* SLIDER SECTION */}
        <div className="flex flex-col items-center w-full min-w-0">
          
          {/* Main Content Row with Arrows */}
          <div className="w-full flex items-center gap-4 lg:gap-8 relative min-w-0">
            
            {/* Left Arrow (Hidden on mobile) */}
            <button 
              onClick={handlePrev}
              className="hidden lg:flex shrink-0 w-12 h-12 rounded-full border border-gray-300 items-center justify-center text-black hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Testimonial Card */}
            <div className="flex-1 min-w-0 w-full bg-[#f7f7f7] rounded-[2rem] p-6 lg:p-10 relative overflow-hidden">
              <div 
                className="flex flex-nowrap transition-transform duration-500 ease-in-out w-full" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full shrink-0 flex flex-col md:flex-row gap-6 lg:gap-12"
                  >
                    
                    {/* Left Column: Photo (~35%) */}
                    <div className="w-full md:w-[35%] shrink-0">
                      <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-sm">
                        <Image 
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Right Column: Text Content (~65%) */}
                    <div className="w-full md:w-[65%] flex flex-col justify-center text-left">
                      
                      {/* Quote Icon */}
                      <Quote className="w-12 h-12 text-[#4ade80] fill-[#4ade80] opacity-50 rotate-180 mb-6" />
                      
                      {/* Quote Text */}
                      <p className="text-black text-[20px] leading-[1.7] font-medium mb-8">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      
                      {/* Author */}
                      <div>
                        <h4 className="text-black font-semibold text-[16px] mb-1">
                          {testimonial.name}
                        </h4>
                        <span className="text-gray-500 text-sm">
                          {testimonial.title}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow (Hidden on mobile) */}
            <button 
              onClick={handleNext}
              className="hidden lg:flex shrink-0 w-12 h-12 rounded-full border border-gray-300 items-center justify-center text-black hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>

          {/* Controls Below Card (Dots & Mobile Arrows) */}
          <div className="w-full flex items-center justify-center mt-8 relative">
            
            {/* Mobile Left Arrow */}
            <button 
              onClick={handlePrev}
              className="lg:hidden absolute left-0 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === index ? 'bg-[#4ade80]' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Right Arrow */}
            <button 
              onClick={handleNext}
              className="lg:hidden absolute right-0 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-black hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
