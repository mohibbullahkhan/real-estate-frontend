"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Menu, X, ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
});

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-full">
      {/* HERO WRAPPER (h-screen) */}
      <div className="relative w-full h-screen min-h-[600px] flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600"
            alt="Modern futuristic house"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Navbar */}
        <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-[20px] tracking-wide">
            EverGreen
          </Link>

          {/* Center Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 bg-white/10 backdrop-blur-md rounded-full p-1.5 pr-6">
            <Link
              href="/"
              className="bg-white text-black px-5 py-2 rounded-full font-[400] text-[15px]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-200 font-[400] text-[15px]"
            >
              About Us
            </Link>
            <Link
              href="/properties"
              className="text-white hover:text-gray-200 font-[400] text-[15px]"
            >
              Property List
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-gray-200 font-[400] text-[15px]"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Divider */}
            <div className="w-[2px] h-[20px] bg-purple-600 opacity-80"></div>

            {/* Lang */}
            <div className="flex items-center gap-1 text-white cursor-pointer">
              <Globe className="w-[18px] h-[18px]" />
              <span className="text-[14px] font-[400]">Eng</span>
            </div>

            {/* Sign Up Button */}
            <Link href="/signup">
              <button className="bg-[#86efac] text-black px-6 py-2.5 rounded-full font-semibold text-[15px] hover:bg-[#4ade80] transition-colors border-none">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center space-y-6 z-40">
            <Link href="/" className="text-white text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="text-white text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/properties" className="text-white text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Property List
            </Link>
            <Link href="/contact" className="text-white text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
            <div className="h-px w-24 bg-gray-500 my-4"></div>
            <div className="flex items-center gap-2 text-white">
              <Globe className="w-6 h-6" />
              <span className="text-xl">Eng</span>
            </div>
            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="bg-[#86efac] text-black px-8 py-3 rounded-full font-semibold text-lg mt-4">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Hero Content positioned at bottom */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-end pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 w-full max-w-7xl mx-auto px-6 md:px-8">
            {/* Left Side: Tags + Headline */}
            <div className="flex flex-col lg:w-[70%]">
              {/* Tags */}
              <motion.div {...fadeUp(0.2)} className="hidden md:flex flex-wrap gap-2 mb-[12px]">
                <span className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium">House</span>
                <span className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium">Apartment</span>
                <span className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium">Residential</span>
              </motion.div>
              <div className="md:hidden flex flex-wrap gap-2 mb-[12px] order-first">
                <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">House</span>
                <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">Apartment</span>
                <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">Residential</span>
              </div>
              {/* Headline */}
              <motion.h1
                {...fadeUp(0.4)}
                className="text-white text-[30px] md:text-[clamp(48px,5vw,68px)] font-bold leading-[1.1] tracking-[-0.02em]"
              >
                Build Your Future, One Property at a Time.
              </motion.h1>
            </div>

            {/* Right Side: Description */}
            <motion.div {...fadeUp(0.6)} className="hidden md:block lg:w-[35%] flex-shrink-0 lg:ml-auto lg:pt-12">
              <p className="text-white text-[14px] leading-[1.7] opacity-90 max-w-[320px] ml-auto">
                Own Your World, One Property at a Time. Own Your World, One
                Property at a Time. Own Your World, One Property at a Time. Own
                Your World, One Property at a Time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* SEARCH BAR (Inside Hero, above background) */}
        <motion.div {...fadeUp(0.8)} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 pb-8 md:pb-8">
          <div className="bg-white rounded-[20px] shadow-lg py-7 px-6 md:px-8 w-full">
            <h2 className="text-[20px] font-bold text-black mb-[20px]">
              Find the best place
            </h2>

            {/* Input Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Input 1 */}
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm font-medium mb-1">
                  Looking for
                </label>
                <input
                  type="text"
                  placeholder="Enter type"
                  className="bg-gray-100 rounded-xl px-4 py-3 outline-none text-black text-sm border-none w-full focus:ring-2 focus:ring-[#86efac] transition-all"
                />
              </div>

              {/* Input 2 */}
              <div className="flex flex-col relative">
                <label className="text-gray-500 text-sm font-medium mb-1">
                  Price
                </label>
                <div className="relative">
                  <select className="bg-gray-100 rounded-xl px-4 py-3 outline-none text-black text-sm border-none w-full appearance-none focus:ring-2 focus:ring-[#86efac] transition-all">
                    <option>Price</option>
                    <option>$100k - $500k</option>
                    <option>$500k - $1M</option>
                    <option>$1M+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Input 3 */}
              <div className="flex flex-col relative">
                <label className="text-gray-500 text-sm font-medium mb-1">
                  Locations
                </label>
                <div className="relative">
                  <select className="bg-gray-100 rounded-xl px-4 py-3 outline-none text-black text-sm border-none w-full appearance-none focus:ring-2 focus:ring-[#86efac] transition-all">
                    <option>Location</option>
                    <option>New York</option>
                    <option>Los Angeles</option>
                    <option>Miami</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Input 4 */}
              <div className="flex flex-col relative">
                <label className="text-gray-500 text-sm font-medium mb-1">
                  Number of rooms
                </label>
                <div className="relative">
                  <select
                    className="bg-gray-100 rounded-xl px-4 py-3 outline-none text-black text-sm border-none w-full appearance-none focus:ring-2 focus:ring-[#86efac] transition-all"
                    defaultValue="2 Bed rooms"
                  >
                    <option>1 Bed room</option>
                    <option value="2 Bed rooms">2 Bed rooms</option>
                    <option>3 Bed rooms</option>
                    <option>4+ Bed rooms</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-4 pt-2">
              {/* Left: Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-gray-400 text-sm font-medium mr-1">
                  Filter:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-normal hover:bg-gray-50 transition-colors">
                    City
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-normal hover:bg-gray-50 transition-colors">
                    House
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-normal hover:bg-gray-50 transition-colors">
                    Residential
                  </button>
                  <button className="bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-1.5 text-sm font-normal hover:bg-gray-50 transition-colors">
                    Apartment
                  </button>
                </div>
              </div>

              {/* Right: Search Button */}
              <button className="bg-black text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors w-full lg:w-auto">
                Search Properties
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
