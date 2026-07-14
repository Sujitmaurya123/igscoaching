"use client";

import React, { useState, useEffect } from 'react';
import {
  Users,
  Target,
  Award,
  GraduationCap,
  Heart,
  Lightbulb,
  Shield,
  CheckCircle,
  Star,
  TrendingUp,
  UserCheck,
  Globe,
  Quote,
  ArrowRight,
} from 'lucide-react';
import Link from "next/link";


// Types
interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  experience: string;
  education: string[];
  avatarColor: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  expertise: string[];
}

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarColor: string;
  date: string;
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Aarav Gupta',
    role: 'Class 12 Student, CBSE Board',
    content: 'The teachers here truly care about their students. I improved my Physics grade from 60% to 95% in just one semester. The personalized attention is incredible!',
    rating: 5,
    avatarColor: 'from-blue-400 to-blue-600',
    date: 'March 2026',
  },
  {
    id: '2',
    name: 'Mrs. Meera Sharma',
    role: 'Parent, UP Board',
    content: "My daughter has been studying here for two years. The transformation in her confidence and academic performance has been remarkable. Highly recommended!",
    rating: 5,
    avatarColor: 'from-green-400 to-green-600',
    date: 'February 2026',
  },
  {
    id: '3',
    name: 'Rohit Singh',
    role: 'Class 11 Student, CBSE Board',
    content: 'The Biology and Chemistry courses are outstanding. I love how they explain complex concepts with real-world examples. The online learning platform is fantastic!',
    rating: 5,
    avatarColor: 'from-purple-400 to-purple-600',
    date: 'January 2026',
  },
  {
    id: '4',
    name: 'Dr. Suresh Patel',
    role: 'Parent & Educator',
    content: 'As an educator myself, I appreciate the depth and quality of their curriculum. The way they integrate technology with traditional teaching is truly innovative.',
    rating: 5,
    avatarColor: 'from-red-400 to-red-600',
    date: 'December 2025',
  },
];



const values = [
  {
    title: 'Excellence in Education',
    description: 'We strive for academic excellence in everything we do.',
    icon: <Award className="w-8 h-8" />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Student-Centric Approach',
    description: 'Every student receives personalized attention and support.',
    icon: <Heart className="w-8 h-8" />,
    color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  },
  {
    title: 'Innovation & Technology',
    description: "Embracing cutting-edge technology to enhance learning.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  },
  {
    title: 'Integrity & Trust',
    description: 'Building trust through transparency and honest communication.',
    icon: <Shield className="w-8 h-8" />,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
];

// Counter Animation Component
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Main Component
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#28355E] via-[#28355E] to-[#28355E] dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Empowering Students for
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We are a dedicated team of educators passionate about making quality education accessible to every student. 
              Our mission is to build strong foundations and nurture curious minds.
            </p>
            
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Our Foundation
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Why We Exist
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              We believe every student deserves access to quality education that inspires curiosity and builds confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              activeTab === 'mission' 
                ? 'border-blue-500 shadow-blue-500/20' 
                : 'border-transparent hover:border-blue-200 dark:hover:border-slate-600'
            }`}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To provide exceptional, accessible, and innovative education that empowers students to achieve their 
                full potential and succeed in their academic journey.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Quality education for every student
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Personalized learning experiences
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Building lifelong learners
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              activeTab === 'vision' 
                ? 'border-purple-500 shadow-purple-500/20' 
                : 'border-transparent hover:border-purple-200 dark:hover:border-slate-600'
            }`}>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To be the most trusted and innovative educational institution that transforms how students learn, 
                making excellence accessible to all.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Excellence in education globally
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Innovation in teaching methods
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Empowering future leaders
                </li>
              </ul>
            </div>

            {/* Values */}
            <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              activeTab === 'values' 
                ? 'border-green-500 shadow-green-500/20' 
                : 'border-transparent hover:border-green-200 dark:hover:border-slate-600'
            }`}>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Our Values</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our core values guide everything we do, from curriculum development to student interactions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  Student-first approach
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Integrity and trust
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Continuous innovation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 md:py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              What Drives Us
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              These principles shape our culture and define how we serve our students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${value.color} mb-4`}>
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Testimonials
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              What Our Students & Parents Say
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Real stories from real people who have experienced our educational approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-blue-400/30 dark:text-blue-300/20 mt-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#28355E] via-[#28355E] to-[#28355E] dark:from-blue-800 dark:via-purple-800 dark:to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Start your journey towards academic excellence with our expert educators and innovative curriculum.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
           
            
            <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-xl bg-[#7e9bfb] px-7 py-4 font-semibold text-white transition hover:bg-[#2b4dbe]"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}