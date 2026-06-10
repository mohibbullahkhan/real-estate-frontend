import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import { ArrowRight, Award, Users, Home, Star } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Marcus Thorne",
      role: "Founder & CEO",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      name: "Elena Rostova",
      role: "Head of Sales",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      name: "Julian Vance",
      role: "Lead Architect",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
  ];

  const stats = [
    { icon: Home, value: "10k+", label: "Properties Sold" },
    { icon: Users, value: "8k+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Awards Won" },
    { icon: Star, value: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="w-full">
        {/* ─── HERO SECTION ─── */}
        <section className="relative w-full overflow-hidden">
          {/* Full bleed image */}
          <div className="relative w-full h-[85vh] min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800"
              alt="EverGreen HQ"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />

            {/* Hero copy */}
            <div className="absolute inset-0 flex flex-col items-start justify-center max-w-[1240px] mx-auto px-6 lg:px-8">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#b4e674] inline-block animate-pulse"></span>
                Est. 2010 · Trusted Nationwide
              </div>

              <h1 className="text-white text-[52px] lg:text-[80px] font-semibold leading-[1.05] tracking-tight max-w-[700px] mb-6 drop-shadow-lg">
                We Don&apos;t Just Sell<br />
                <span className="text-[#b4e674]">Homes.</span>
              </h1>
              <p className="text-white/90 text-[18px] lg:text-[20px] leading-[1.6] max-w-[540px] mb-10 drop-shadow-md font-light">
                We build lasting relationships, spark neighbourhoods, and redefine what it means to find a place you love.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#story">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-xl">
                    Our Story <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <a href="/contact">
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-[15px] hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* ── FLOATING STATS STRIP ── */}
          <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-8 -mt-16">
            <div className="bg-white rounded-[28px] shadow-lg border border-gray-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 overflow-hidden">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center justify-center py-8 px-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-[28px] font-semibold text-black leading-none">{value}</span>
                  <span className="text-gray-500 text-[13px] mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR STORY ─── */}
        <section id="story" className="py-24 px-6 lg:px-8 max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Left Image Group */}
            <div className="w-full lg:w-1/2 relative h-[540px] flex-shrink-0">
              <div className="absolute top-0 left-0 w-[78%] h-[82%] rounded-[32px] overflow-hidden shadow-md">
                <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" alt="Team" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[48%] rounded-[32px] overflow-hidden shadow-xl border-4 border-[#fafafa]">
                <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800" alt="House" fill className="object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute top-[38%] right-[2%] bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100 z-10">
                <div className="text-[28px] font-bold text-black leading-none">15+</div>
                <div className="text-gray-500 text-[13px]">Years of Excellence</div>
              </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0fdf4] border border-green-100 text-green-700 text-sm font-medium mb-6">
                <span>🌿</span> Our Story
              </div>
              <h2 className="text-black text-[36px] lg:text-[48px] font-semibold leading-[1.1] tracking-tight mb-6">
                Built on Trust,<br />Driven by Vision
              </h2>
              <p className="text-gray-500 text-[16px] leading-[1.7] mb-5">
                Founded with a vision to simplify real estate, EverGreen started as a small team of passionate agents who wanted to do things differently. We noticed that the process of buying or selling a home was often stressful and opaque.
              </p>
              <p className="text-gray-500 text-[16px] leading-[1.7] mb-8">
                Today, we leverage cutting-edge technology, deep market insights, and a design-first approach to connect people with spaces that inspire them.
              </p>
              <a href="/properties">
                <button className="bg-black text-white px-7 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  Browse Properties <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* ─── TEAM ─── */}
        <section className="py-16 lg:py-24 px-6 lg:px-8 max-w-[1240px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 mb-5 shadow-sm">
              <span>👥</span> The Team
            </div>
            <h2 className="text-black text-[36px] lg:text-[46px] font-semibold leading-[1.1] tracking-tight">
              Meet the Experts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="relative w-full h-[280px] overflow-hidden">
                  <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="text-[20px] font-semibold leading-tight">{member.name}</h3>
                    <p className="text-white/75 text-[13px]">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </main>
    </div>
  );
}
