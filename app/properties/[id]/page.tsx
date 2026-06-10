import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PROPERTIES } from "@/lib/data";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import { Bed, Bath, MapPin, Maximize, CheckCircle2, ArrowLeft, Heart, Share, Grid } from "lucide-react";

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = ALL_PROPERTIES.find((p) => p.id === parseInt(id));

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        {/* Full Bleed Hero Section */}
        <section className="relative w-full h-[75vh] min-h-[600px]">
          <Image
            src={property.images[0] || property.image}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          
          {/* Top Actions */}
          <div className="absolute top-8 inset-x-0 z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
            <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-200 transition-colors backdrop-blur-md bg-black/20 px-5 py-2.5 rounded-full border border-white/20">
              <ArrowLeft className="w-4 h-4" /> Back to List
            </Link>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                <Share className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Content positioned at bottom */}
          <div className="absolute bottom-12 inset-x-0 z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white text-[13px] font-medium tracking-wide uppercase">
                  {property.badge}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#b4e674] text-black text-[13px] font-bold tracking-wide uppercase">
                  {property.type}
                </span>
              </div>
              <h1 className="text-[42px] md:text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-4 drop-shadow-lg">
                {property.name}
              </h1>
              <p className="text-white/90 flex items-center gap-2 text-[18px] md:text-[20px] font-light">
                <MapPin className="w-5 h-5 text-[#b4e674]" /> {property.location}
              </p>
            </div>

            {/* Gallery Button */}
            <button className="hidden md:flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-gray-100 transition-colors shadow-xl group">
              <Grid className="w-4 h-4 group-hover:scale-110 transition-transform" />
              View Gallery ({property.images.length})
            </button>
          </div>
        </section>

        {/* Content Wrapper */}
        <section className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 pb-24">
          
          {/* Left Column (Main Details) - 8 columns */}
          <div className="lg:col-span-8">
            {/* Quick Stats Banner */}
            <div className="bg-[#fafafa] rounded-[32px] p-8 md:p-10 flex flex-wrap justify-between items-center gap-8 mb-16 border border-gray-100">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Bed className="w-5 h-5" />
                  <span className="text-[14px] font-medium uppercase tracking-wider">Bedrooms</span>
                </div>
                <p className="text-[32px] font-bold text-black leading-none">{property.beds}</p>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Bath className="w-5 h-5" />
                  <span className="text-[14px] font-medium uppercase tracking-wider">Bathrooms</span>
                </div>
                <p className="text-[32px] font-bold text-black leading-none">{property.baths}</p>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Maximize className="w-5 h-5" />
                  <span className="text-[14px] font-medium uppercase tracking-wider">Square Area</span>
                </div>
                <p className="text-[32px] font-bold text-black leading-none">{property.sqft.toLocaleString()} <span className="text-[16px] text-gray-400 font-normal">sqft</span></p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-16">
              <h2 className="text-[32px] font-bold text-black mb-6 tracking-tight">The Property</h2>
              <p className="text-gray-600 text-[18px] leading-[1.8] font-light">
                {property.description || "A beautiful property waiting to be your next home. Features spacious layouts, modern amenities, and a prime location perfect for any lifestyle. Enjoy serene living with easy access to all the best the city has to offer."}
              </p>
            </div>

            {/* Features Gallery/Grid */}
            <div className="mb-16">
              <h2 className="text-[32px] font-bold text-black mb-8 tracking-tight">Premium Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(property.features || ["Air Conditioning", "Heating", "Internet", "Parking"]).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5 text-[#b4e674]" />
                    </div>
                    <span className="text-gray-800 text-[17px] font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Images (if any) */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4 h-[300px] md:h-[400px]">
                {(property.images.slice(1, 3)).map((img, i) => (
                  <div key={i} className="relative w-full h-full rounded-[32px] overflow-hidden group">
                    <Image src={img} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) - 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
              <p className="text-gray-400 font-medium text-[13px] uppercase tracking-widest mb-3">Price</p>
              <h3 className="text-[48px] font-extrabold text-black leading-[1] mb-8 tracking-tight">{formatPrice(property.price)}</h3>
              
              <div className="flex flex-col gap-4">
                <button className="w-full bg-black text-white rounded-full py-4 font-semibold text-[16px] hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                  Schedule a Tour
                </button>
                <button className="w-full bg-transparent text-black border-2 border-gray-200 rounded-full py-4 font-semibold text-[16px] hover:border-black transition-colors">
                  Ask a Question
                </button>
              </div>

              <div className="my-10 h-px bg-gray-100 w-full" />

              <div className="flex flex-col">
                <p className="text-gray-400 font-medium text-[13px] uppercase tracking-widest mb-6">Listed By</p>
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                    <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" alt="Agent" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-black mb-1">Marcus Thorne</p>
                    <p className="text-[14px] text-gray-500 font-medium">EverGreen Premium</p>
                  </div>
                </div>
                <button className="mt-6 w-full text-[14px] font-medium text-black bg-gray-50 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                  View Agent Profile
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-[#fafafa] pt-12">
          <CTASection />
        </div>
      </main>
    </div>
  );
}
