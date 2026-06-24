"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";
import api from "@/lib/api";
import { handleApiError } from "@/lib/utils";
import { showSuccess, showError } from "@/lib/alerts";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.post('/api/inquiries', {
        name: formData.name,
        email: formData.email.trim().toLowerCase(),
        message: formData.message,
        type: 'GENERAL',
      });
      await showSuccess('Message sent!', "We'll get back to you shortly.");
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      await showError('Something went wrong', handleApiError(err) || 'Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="w-full">
        {/* HEADER SECTION */}
        <section className="pt-16 pb-12 lg:pt-24 lg:pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 mb-6 shadow-sm">
            <span>💬</span> We&apos;re here to help
          </div>
          <h1 className="text-black text-[42px] lg:text-[64px] font-semibold leading-[1.1] tracking-tight max-w-[800px] mb-6">
            Let&apos;s start a <span className="text-gray-500">Conversation</span>
          </h1>
          <p className="text-gray-500 text-[16px] lg:text-[18px] leading-[1.6] max-w-[600px] mb-12">
            Whether you&apos;re looking to buy, sell, or simply explore your options, our team of experts is ready to guide you.
          </p>
        </section>

        {/* CONTENT SECTION */}
        <section className="pb-24 px-6 lg:px-12 max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left: Contact Form */}
            <div className="w-full lg:w-1/2 bg-white rounded-[32px] p-8 lg:p-12 shadow-sm border border-gray-100">
              <h2 className="text-[28px] font-semibold text-black mb-8">Send us a message</h2>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com" 
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Message *</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you?" 
                    rows={5}
                    className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white rounded-full py-4 font-semibold text-[16px] hover:bg-gray-800 transition-colors mt-2 disabled:opacity-70"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Right: Contact Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="text-[28px] font-semibold text-black mb-8">Contact Information</h2>
                
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-medium text-black mb-1">Our Office</h3>
                      <p className="text-gray-500 leading-relaxed text-[15px]">12345, Gazipur, Dhaka, Road,<br />Bangladesh.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-medium text-black mb-1">Phone Number</h3>
                      <p className="text-gray-500 leading-relaxed text-[15px]">(+1) 839-849-8483</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-medium text-black mb-1">Email</h3>
                      <p className="text-gray-500 leading-relaxed text-[15px]">hello@evergreen.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Map */}
              <div className="w-full h-[250px] rounded-[24px] overflow-hidden shadow-sm relative border border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.513470388277!2d90.3986877!3d23.871401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c43b9df7a199%3A0xcb065ec0150d0356!2sGazipur!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-125 opacity-80"
                ></iframe>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
