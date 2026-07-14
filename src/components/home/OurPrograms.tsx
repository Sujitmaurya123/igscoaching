// app/components/OurPrograms.tsx
"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// TypeScript interface for program data
interface Program {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  description: string;
  features: string[];
  ctaLink: string;
  ctaText: string;
  popular?: boolean;
}

// Program data with enhanced metadata
const programs: Program[] = [
  {
    id: "school-prep",
    title: "Class 1 - 8",
    subtitle: "School Preparation",
        color: "from-[#28355E] to-[#28355E]",

    icon: "📚",
    description:
      "Building strong academic foundations with personalized learning paths and conceptual clarity.",
    features: ["Core Subjects", "STEM Activities", "Language Arts", "Study Skills"],
    ctaLink: "/programs/school-prep",
    ctaText: "View Curriculum",
    
  },
  {
    id: "foundation",
    title: "Foundation",
    subtitle: "Class 9 & 10",
    color: "from-[#28355E] to-[#28355E]",
    icon: "🚀",
    description:
      "Strategic preparation for board exams with focus on conceptual mastery and exam techniques.",
    features: ["Board Prep", "Practice Tests", "Doubt Clearing", "Time Management"],
    ctaLink: "/programs/foundation",
    ctaText: "Start Foundation",
    popular: true,
  },
  {
    id: "senior-secondary",
    title: "Class 11 & 12",
    subtitle: "Science • Arts • Commerce",
        color: "from-[#28355E] to-[#28355E]",

    icon: "🎯",
    description:
      "Stream-specific coaching with career guidance and competitive exam readiness.",
    features: ["Stream Specialization", "Career Counseling", "Mock Tests", "University Prep"],
    ctaLink: "/programs/senior-secondary",
    ctaText: "Explore Streams",
    popular: true,
  },
];

// Animation variants for stagger effect
const containerVariants:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function OurPrograms() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Accessibility */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-5 py-2.5 rounded-full text-sm tracking-wide border border-blue-100/50"
              aria-label="Program category"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              OUR PROGRAMS
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
              Courses We Offer
            </h2>

            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              From foundational learning to board exam preparation, we provide
              expert guidance for every stage of your academic journey.
            </p>
          </motion.div>
        </header>

        {/* Programs Grid with Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => (
            <motion.article
              key={program.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(program.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                program.popular ? "ring-2 ring-blue-500/30" : ""
              }`}
              aria-label={`Program: ${program.title}`}
            >
              {/* Popular Badge */}
              {program.popular && (
                <span className="absolute -top-3 right-4 bg-gradient-to-r from-[#5c78d5] to-[#546fc5] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/25 z-10">
                  ⭐ Popular
                </span>
              )}

              {/* Color Accent Bar with Animation */}
              <div
                className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${program.color} transition-all duration-500 group-hover:h-2`}
              />

              <div className="p-6 sm:p-8 text-center">
                {/* Icon with Gradient Background */}
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-4xl shadow-lg shadow-current/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  aria-hidden="true"
                >
                  {program.icon}
                </div>

                <h3 className="mt-5 text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {program.title}
                </h3>

                <p className="mt-1.5 text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {program.subtitle}
                </p>

                {/* Description - shows on larger screens */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed hidden md:block">
                  {program.description}
                </p>

                {/* Feature Tags */}
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {program.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                  {program.features.length > 3 && (
                    <span className="text-xs text-slate-400 font-medium px-2 py-1">
                      +{program.features.length - 3}
                    </span>
                  )}
                </div>

                {/* CTA Button with Hover Effect */}
                <Link
                  href={program.ctaLink}
                  className={`mt-6 inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r ${program.color} px-6 py-3.5 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-current/20 hover:scale-[1.02] active:scale-[0.98] ${
                    hoveredId === program.id ? "shadow-lg" : ""
                  }`}
                  aria-label={`Learn more about ${program.title}`}
                >
                  {program.ctaText}
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>

              {/* Accessibility: Decorative gradient overlay on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${program.color} opacity-0 transition-opacity duration-300 pointer-events-none -z-10 group-hover:opacity-5`}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA Section - Real-world conversion */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            Not sure which program fits you best?{" "}
            <Link
              href="/assessment"
              className="text-blue-600 font-semibold hover:text-blue-700 underline-offset-2 hover:underline transition"
            >
              Take our free assessment →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}