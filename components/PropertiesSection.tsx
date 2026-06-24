'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, Bath, Home } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export default function PropertiesSection() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/api/properties/featured');
        setProperties(res.data.data || []);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="bg-white w-full py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col max-w-2xl">
            <h2 className="text-black text-3xl md:text-[40px] font-bold mb-4 leading-tight">
              Explore our premier houses
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              Each listing offers unique features, exceptional quality, and
              prime locations, ensuring an exclusive living experience.
            </p>
          </div>
          <Link href="/properties">
            <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 w-fit">
              See All Properties <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* LOADING / ERROR / EMPTY STATES */}
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        )}

        {!isLoading && (isError || properties.length === 0) && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">No featured properties available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Please check back later or view all our listings.</p>
          </div>
        )}

        {/* PROPERTY CARDS GRID */}
        {!isLoading && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {properties.map((property: any) => (
              <Link
                href={`/properties/${property._id || property.id}`}
                key={property._id || property.id}
                className="flex flex-col group cursor-pointer"
              >
                {/* Property Image Container */}
                <div className="relative w-full h-[240px] rounded-2xl overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
                  {property.coverImage ? (
                    <Image
                      src={property.coverImage}
                      alt={property.title || 'Property Image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Home className="w-12 h-12 text-gray-300" />
                  )}

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {property.listingType?.replace('_', ' ') || 'For Sale'}
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms || 0} Bedrooms</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms || 0} Bathroom</span>
                  </div>
                </div>

                {/* Property Title */}
                <h3 className="text-[18px] font-semibold text-black mb-1 group-hover:text-purple-600 transition-colors">
                  {property.title}
                </h3>

                {/* Price & Location */}
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-black font-semibold">
                    {formatCurrency(property.price)}
                  </span>
                  <span className="text-gray-500 text-sm truncate">
                    · {property.city}{property.state ? `, ${property.state}` : ''}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="mt-4">
                  <button className="w-full bg-gray-100 text-black py-2.5 rounded-xl font-medium group-hover:bg-[#86efac] transition-colors">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
