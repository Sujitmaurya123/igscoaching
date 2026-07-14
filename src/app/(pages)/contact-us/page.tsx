// app/contact/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";



// Contact information
const contactInfo = [
  {
    id: "address",
    icon: "📍",
    title: "Visit Us",
    details: ["Vindhya Public Junior High School, Nadihar, Rajgarh", "Mirzapur", "Uttar Pradesh, India"],
    link: "https://maps.google.com",
    linkText: "Get Directions →",
  },
  {
    id: "phone",
    icon: "📞",
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    link: "tel:+15551234567",
    linkText: "Call Now →",
  },
  {
    id: "email",
    icon: "✉️",
    title: "Email Us",
    details: ["hello@igs.com", "support@igs.com"],
    link: "mailto:hello@igs.com",
    linkText: "Send Email →",
  },
  {
    id: "hours",
    icon: "🕐",
    title: "Working Hours",
    details: ["Monday - Friday: 8:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
    link: "/",
    linkText: "Book Appointment →",
  },
];

// FAQ data
const faqs = [
  {
    id: "faq-1",
    question: "What programs do you offer?",
    answer:
      "We offer comprehensive programs from LKG to Class 12, covering Early Learning, School Preparation, Foundation (Class 9-10), and Senior Secondary (Class 11-12) with Science, Arts, and Commerce streams.",
  },
  {
    id: "faq-2",
    question: "How can I enroll in a program?",
    answer:
      "You can enroll by filling out the contact form below, calling our helpline, or visiting our center. We'll schedule a consultation to understand your needs and guide you through the enrollment process.",
  },
  {
    id: "faq-3",
    question: "Do you offer online classes?",
    answer:
      "Yes, we offer hybrid learning options with both in-person and online classes. Our online platform provides interactive sessions, recorded lectures, and digital resources for flexible learning.",
  },
  {
    id: "faq-4",
    question: "What is the fee structure?",
    answer:
      "Our fee structure varies by program and is designed to be affordable. We offer flexible payment plans and scholarships for meritorious students. Contact us for detailed fee information.",
  },
];

export default function ContactPage() {


  
  const [expandedFaq, setExpandedFaq] = useState<string | null>("faq-1");
 

  

  

  

  // Toggle FAQ
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-5 py-2.5 rounded-full text-sm border border-blue-100/50">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            GET IN TOUCH
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Let&apos;s Start a <span className="text-blue-600">Conversation</span>
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our programs? We&apos;re here to help. Reach out to
            us and let&apos;s shape your learning journey together.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16"
        >
          {contactInfo.map((info) => (
            <div
              key={info.id}
              className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="text-lg font-bold text-slate-900">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-sm text-slate-600 mt-1">
                  {detail}
                </p>
              ))}
              <Link
                href={info.link}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-3 group-hover:gap-2 transition-all"
              >
                {info.linkText}
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Contact Form and Map Section */}
       

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-slate-600">Find quick answers to common queries</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={expandedFaq === faq.id}
                >
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  <span className="text-2xl text-blue-600 transition-transform duration-300 flex-shrink-0 ml-4">
                    {expandedFaq === faq.id ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-slate-600 border-t border-slate-100"
                  >
                    <p className="pt-3">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}