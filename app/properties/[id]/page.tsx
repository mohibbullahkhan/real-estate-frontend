"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import PropertyGallerySlider from "@/components/PropertyGallerySlider";
import { Bed, Bath, MapPin, Maximize, CheckCircle2, ArrowLeft, Heart, Share, Grid, Home, X } from "lucide-react";
import { showSuccess, showError } from "@/lib/alerts";
import api from "@/lib/api";
import { handleApiError, formatCurrency } from "@/lib/utils";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"TOUR_REQUEST" | "QUESTION">("TOUR_REQUEST");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/properties/${id}`);
        setProperty(res.data.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleOpenModal = (type: "TOUR_REQUEST" | "QUESTION") => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Email must be lowercased per backend requirement
      const payload: any = {
        ...formData,
        email: formData.email.trim().toLowerCase(),
        type: inquiryType,
        propertyId: id,
      };
      // Remove phone if empty (backend may reject empty string)
      if (!payload.phone) delete payload.phone;

      await api.post('/api/inquiries', payload);
      handleCloseModal();
      await showSuccess('Inquiry submitted!', "We'll review your message and get back to you shortly.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      await showError('Submission failed', handleApiError(error) || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-500 mb-8">The property you are looking for does not exist or has been removed.</p>
          <Link href="/properties" className="bg-black text-white px-6 py-3 rounded-full font-medium">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  // Parse amenities — backend may return JSON string array or array
  let amenitiesList: string[] = [];
  if (property.amenities) {
    try {
      const parsed = typeof property.amenities === 'string' ? JSON.parse(property.amenities) : property.amenities;
      amenitiesList = Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      amenitiesList = typeof property.amenities === 'string'
        ? property.amenities.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];
    }
  }

  // Build gallery images array from propertyImages (backend shape)
  const galleryImages: string[] = property.propertyImages?.map((img: any) => img.url).filter(Boolean) || [];
  // If no gallery, fall back to coverImage
  const allImages = galleryImages.length > 0 ? galleryImages : property.coverImage ? [property.coverImage] : [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="w-full">
        {/* Full Bleed Hero Section */}
        <section className="relative w-full h-[75vh] min-h-[600px] bg-gray-100 flex items-center justify-center">
          {property.coverImage ? (
            <Image
              src={property.coverImage}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Home className="w-32 h-32 text-gray-300" />
          )}
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
                  {(property.listingType || 'FOR_SALE').replace('_', ' ')}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#b4e674] text-black text-[13px] font-bold tracking-wide uppercase">
                  {property.propertyType}
                </span>
              </div>
              <h1 className="text-[42px] md:text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-4 drop-shadow-lg">
                {property.title}
              </h1>
              <p className="text-white/90 flex items-center gap-2 text-[18px] md:text-[20px] font-light">
                <MapPin className="w-5 h-5 text-[#b4e674]" /> {property.address}, {property.city}{property.state ? `, ${property.state}` : ''}
              </p>
            </div>

            {/* Gallery Button */}
            {allImages.length > 0 && (
              <button className="hidden md:flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-[15px] hover:bg-gray-100 transition-colors shadow-xl group">
                <Grid className="w-4 h-4 group-hover:scale-110 transition-transform" />
                View Gallery ({allImages.length})
              </button>
            )}
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
                <p className="text-[32px] font-bold text-black leading-none">{property.bedrooms}</p>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Bath className="w-5 h-5" />
                  <span className="text-[14px] font-medium uppercase tracking-wider">Bathrooms</span>
                </div>
                <p className="text-[32px] font-bold text-black leading-none">{property.bathrooms}</p>
              </div>
              <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Maximize className="w-5 h-5" />
                  <span className="text-[14px] font-medium uppercase tracking-wider">Square Area</span>
                </div>
                <p className="text-[32px] font-bold text-black leading-none">{(property.squareArea || 0).toLocaleString()} <span className="text-[16px] text-gray-400 font-normal">sqft</span></p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-16">
              <h2 className="text-[32px] font-bold text-black mb-6 tracking-tight">The Property</h2>
              <p className="text-gray-600 text-[18px] leading-[1.8] font-light whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <div className="mb-16">
                <h2 className="text-[32px] font-bold text-black mb-8 tracking-tight">Premium Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {amenitiesList.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow group">
                      <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-[#b4e674]" />
                      </div>
                      <span className="text-gray-800 text-[17px] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Slider */}
            {allImages.length > 0 && (
              <PropertyGallerySlider images={allImages} />
            )}
          </div>

          {/* Right Column (Sidebar) - 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
              <p className="text-gray-400 font-medium text-[13px] uppercase tracking-widest mb-3">Price</p>
              <h3 className="text-[48px] font-extrabold text-black leading-[1] mb-8 tracking-tight">{formatCurrency(property.price)}</h3>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleOpenModal('TOUR_REQUEST')}
                  className="w-full bg-black text-white rounded-full py-4 font-semibold text-[16px] hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                >
                  Schedule a Tour
                </button>
                <button 
                  onClick={() => handleOpenModal('QUESTION')}
                  className="w-full bg-transparent text-black border-2 border-gray-200 rounded-full py-4 font-semibold text-[16px] hover:border-black transition-colors"
                >
                  Ask a Question
                </button>
              </div>

              <div className="my-10 h-px bg-gray-100 w-full" />

              <div className="flex flex-col">
                <p className="text-gray-400 font-medium text-[13px] uppercase tracking-widest mb-6">Listed By</p>
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner">
                    {property.agentPhoto ? (
                      <Image src={property.agentPhoto} alt={property.agentName || 'Agent'} fill className="object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-gray-500">{(property.agentName || 'A')[0].toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-black mb-1">{property.agentName || 'EverGreen Agent'}</p>
                    <p className="text-[14px] text-gray-500 font-medium">{property.agentTitle || 'Real Estate Agent'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-[#fafafa] pt-12">
          <CTASection />
        </div>
      </main>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {inquiryType === 'TOUR_REQUEST' ? 'Schedule a Tour' : 'Ask a Question'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                For <span className="font-semibold text-black">{property.title}</span>
              </p>
            </div>
            <form onSubmit={handleSubmitInquiry} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black" 
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black" 
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea 
                  name="message" 
                  required 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-black focus:border-black" 
                  placeholder={inquiryType === 'TOUR_REQUEST' ? "I'd like to schedule a tour for this property..." : "I have a question about..."}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
