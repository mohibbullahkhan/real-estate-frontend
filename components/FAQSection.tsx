"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What types of properties do you sell?",
      answer:
        "We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.",
    },
    {
      question: "How do I know if a property is a good investment?",
      answer:
        "We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.",
    },
    {
      question: "Do I need to hire a real estate agent?",
      answer:
        "We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.",
    },
    {
      question: "What's the process for buying a property?",
      answer:
        "We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.",
    },
    {
      question: "Can I tour a property before purchasing?",
      answer:
        "We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white w-full py-20 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <h2 className="text-black text-[42px] lg:text-[54px] font-medium leading-[1.1] tracking-tight max-w-[400px]">
            Frequently asked questions
          </h2>
          <p className="text-gray-600 text-[15px] leading-[1.6] max-w-[460px] lg:pt-3">
            Our experts guide you in making informed investment decisions based
            on market insights. We offer residential, commercial, and luxury
            properties tailored to different preferences and budgets.
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="w-full flex flex-col gap-[14px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`w-full border border-gray-200 rounded-[12px] bg-white transition-all duration-300 ${isOpen ? "p-6 pb-7 shadow-sm" : "p-6"}`}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                >
                  <span
                    className={`text-[20px] font-medium transition-colors ${isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-black"}`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 pt-1">
                      {/* Left: Answer Text */}
                      <div className="flex-1 flex flex-col items-start pr-0 lg:pr-8">
                        <p className="text-gray-500 text-[15px] leading-[1.65]">
                          {faq.answer}
                        </p>
                      </div>

                      {/* Right: Small Image (Hidden on mobile) */}
                      <div className="hidden md:block shrink-0 relative w-[240px] h-[135px] rounded-xl overflow-hidden border border-gray-100">
                        <Image
                          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"
                          alt="Interior room"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
