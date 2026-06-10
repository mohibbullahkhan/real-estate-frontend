"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Bed, Bath, MapPin, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Heart } from "lucide-react";

import { ALL_PROPERTIES } from "@/lib/data";

const PROPERTY_TYPES = ["All", "House", "Villa", "Apartment", "Townhouse"];
const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $2M", min: 0, max: 2000000 },
  { label: "$2M – $4M", min: 2000000, max: 4000000 },
  { label: "$4M+", min: 4000000, max: Infinity },
];
const BEDS_OPTIONS = ["Any", "2+", "3+", "4+", "5+"];
const ITEMS_PER_PAGE = 6;
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low"];

function formatPrice(n: number) {
  return "$" + (n / 1000000).toFixed(1) + "M";
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeType, setActiveType] = useState(searchParams.get("type") || "All");
  const [priceRange, setPriceRange] = useState(Number(searchParams.get("price")) || 0);
  const [beds, setBeds] = useState(searchParams.get("beds") || "Any");
  const [sort, setSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [saved, setSaved] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...ALL_PROPERTIES];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
    if (activeType !== "All") list = list.filter(p => p.type === activeType);
    const { min, max } = PRICE_RANGES[priceRange];
    list = list.filter(p => p.price >= min && p.price <= max);
    if (beds !== "Any") {
      const minBeds = parseInt(beds);
      list = list.filter(p => p.beds >= minBeds);
    }
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    return list;
  }, [search, activeType, priceRange, beds, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTypeChange = (type: string) => { setActiveType(type); setCurrentPage(1); };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setCurrentPage(1); };
  const toggleSave = (id: number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="w-full pb-24">
        {/* ── HEADER ── */}
        <section className="pt-14 pb-10 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 mb-5 shadow-sm">
                <span>🏡</span> {filtered.length} Properties Available
              </div>
              <h1 className="text-black text-[42px] lg:text-[56px] font-semibold leading-[1.1] tracking-tight">
                Find Your Dream <span className="text-gray-400">Property</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-full h-11 pl-5 pr-10 text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-sm transition-all hover:border-gray-300"
                >
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 h-11 rounded-full text-[14px] font-medium border transition-colors shadow-sm ${showFilters ? "bg-black text-white border-black" : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"}`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>
        </section>

        {/* ── SEARCH + FILTERS ── */}
        <section className="px-6 lg:px-12 max-w-[1400px] mx-auto mb-10">
          {/* Search bar */}
          <div className="relative w-full mb-5">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or city…"
              value={search}
              onChange={handleSearch}
              className="w-full bg-white border border-gray-200 rounded-full pl-14 pr-6 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-black transition-all shadow-sm"
            />
          </div>

          {/* Type pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {PROPERTY_TYPES.map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-5 py-2 rounded-full text-[14px] font-medium border transition-all ${activeType === type ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col lg:flex-row gap-8 shadow-sm mt-2">
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-gray-500 mb-3 uppercase tracking-wide">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => { setPriceRange(i); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${priceRange === i ? "bg-black text-white border-black" : "bg-[#fafafa] text-gray-600 border-gray-200 hover:border-gray-400"}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-px bg-gray-100 hidden lg:block" />
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-gray-500 mb-3 uppercase tracking-wide">Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  {BEDS_OPTIONS.map(b => (
                    <button
                      key={b}
                      onClick={() => { setBeds(b); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${beds === b ? "bg-black text-white border-black" : "bg-[#fafafa] text-gray-600 border-gray-200 hover:border-gray-400"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── PROPERTY GRID ── */}
        <section className="px-6 lg:px-12 max-w-[1400px] mx-auto">
          {paginated.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <div className="text-5xl mb-4">🏚️</div>
              <p className="text-[18px] font-medium">No properties match your filters.</p>
              <button onClick={() => { setSearch(""); setActiveType("All"); setPriceRange(0); setBeds("Any"); }} className="mt-4 text-black underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map(property => (
                <div key={property.id} className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  {/* Image */}
                  <div className="relative w-full h-[240px] overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${property.badge === "Luxury" ? "bg-amber-400 text-black" : property.badge === "Featured" ? "bg-[#b4e674] text-black" : "bg-white text-black"}`}>
                      {property.badge}
                    </div>
                    {/* Heart */}
                    <button
                      onClick={() => toggleSave(property.id)}
                      className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${saved.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-gray-400 text-[13px] mb-2">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.beds} Beds</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.baths} Baths</span>
                      <span>·</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <h3 className="text-[17px] font-semibold text-black mb-1 line-clamp-1">{property.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-[13px] mb-4">
                      <MapPin className="w-3.5 h-3.5" /> {property.location}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-[20px] font-bold text-black">{formatPrice(property.price)}</span>
                      <Link href={`/properties/${property.id}`}>
                        <button className="bg-black text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-black transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full text-[14px] font-medium transition-all ${page === currentPage ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-700 hover:border-black"}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-black transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page info */}
          {filtered.length > 0 && (
            <p className="text-center text-gray-400 text-sm mt-4">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} properties
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
