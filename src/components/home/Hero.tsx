import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Award, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              🎓 Admissions Open 2026–27
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Build Your
              <span className="text-blue-600"> Bright Future </span>
              With Expert Coaching
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Quality education for Class 1–12 students with experienced
              teachers, smart classrooms, regular tests, and personalized
              guidance to help every student achieve success.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-xl bg-[#28355E] px-7 py-4 font-semibold text-white transition hover:bg-[#17275d]"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Explore Courses
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-blue-600">5000+</h2>
                <p className="text-gray-600">Students</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">50+</h2>
                <p className="text-gray-600">Expert Teachers</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">98%</h2>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-2xl">
              <Image
                src="/images/hero.webp"
                alt="Students Learning"
                width={700}
                height={700}
                className="rounded-2xl object-cover"
                priority
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <Award className="h-7 w-7 text-blue-600" />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    100% Quality Education
                  </h4>
                  <p className="text-sm text-gray-500">
                    Trusted by Thousands of Students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <BookOpen className="mb-4 h-10 w-10 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Smart Learning
            </h3>
            <p className="mt-2 text-gray-600">
              Interactive classes with modern teaching techniques and study
              materials.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <Users className="mb-4 h-10 w-10 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Expert Faculty
            </h3>
            <p className="mt-2 text-gray-600">
              Highly experienced teachers dedicated to every student&apos;s success.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <Award className="mb-4 h-10 w-10 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Excellent Results
            </h3>
            <p className="mt-2 text-gray-600">
              Proven track record of outstanding board exam and competitive exam
              results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}