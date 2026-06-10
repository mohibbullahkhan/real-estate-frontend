"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/properties", label: "Property List" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-[#fafafa]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-black font-bold text-[20px] tracking-tight">
            EverGreen
          </Link>

          {/* Center Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-white border border-gray-100 shadow-sm rounded-full p-1.5">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-5 py-2 rounded-full font-medium text-[14px] transition-all duration-200 ${
                  isActive(href)
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-black transition-colors">
              <Globe className="w-[16px] h-[16px]" />
              <span className="text-[13px] font-medium">Eng</span>
            </div>
            <Link href="/signin">
              <button className="text-gray-700 font-medium text-[14px] hover:text-black transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-black text-white px-5 py-2.5 rounded-full font-medium text-[14px] hover:bg-gray-800 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-black relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center space-y-6 z-40">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-medium transition-colors ${
                isActive(href) ? "text-[#b4e674]" : "text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="h-px w-24 bg-gray-500 my-4"></div>
          <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="bg-[#b4e674] text-black px-8 py-3 rounded-full font-semibold text-lg mt-4">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
