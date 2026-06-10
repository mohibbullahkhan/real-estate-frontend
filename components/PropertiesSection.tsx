import React from "react";
import Image from "next/image";
import { ArrowRight, Bed, Bath } from "lucide-react";

export default function PropertiesSection() {
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600",
      beds: 5,
      baths: 2,
      name: "The Pinnacle at Highland Park",
      price: "$3,567,98.00",
      location: "123 Maple Street, New York",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600",
      beds: 4,
      baths: 3,
      name: "Modern Retreat by the Lake",
      price: "$2,150,00.00",
      location: "456 Oak Avenue, Chicago",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
      beds: 6,
      baths: 4,
      name: "Grand Estate in the Valley",
      price: "$5,200,00.00",
      location: "789 Pine Road, Los Angeles",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
      beds: 3,
      baths: 2,
      name: "Cozy Suburban Family Home",
      price: "$1,850,00.00",
      location: "321 Elm Street, Austin",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
      beds: 5,
      baths: 3,
      name: "Luxury Villa with Pool",
      price: "$4,100,00.00",
      location: "654 Cedar Lane, Miami",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600",
      beds: 4,
      baths: 2,
      name: "Contemporary Urban Townhouse",
      price: "$2,950,00.00",
      location: "987 Birch Blvd, Seattle",
    },
  ];

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
          <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 w-fit">
            See All Properties <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* PROPERTY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col group cursor-pointer"
            >
              {/* Property Image Container */}
              <div className="relative w-full h-[240px] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  For Sale
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4" />
                  <span>{property.beds} Bedrooms</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4" />
                  <span>{property.baths} Bathroom</span>
                </div>
              </div>

              {/* Property Title */}
              <h3 className="text-[18px] font-semibold text-black mb-1 group-hover:text-purple-600 transition-colors">
                {property.name}
              </h3>

              {/* Price & Location */}
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-black font-semibold">
                  {property.price}
                </span>
                <span className="text-gray-500 text-sm truncate">
                  · {property.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
