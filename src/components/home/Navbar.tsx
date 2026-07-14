"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsappIcon";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  // { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
  
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
  <div className="flex h-12 w-12 items-center justify-center overflow-hidden  ">
    <Image
      src="/images/logo.png"
      alt="Bright Future Coaching Classes Logo"
      width={48}
      height={48}
      className="h-full w-full object-contain"
      priority
    />
  </div>

  <div>
  </div>
</Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-gray-700 transition hover:text-[#28355E]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Link
            href="/contact-us"
            className="rounded-xl bg-[#28355E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#28355E]"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 lg:hidden hover:bg-gray-100"
        >
          {open ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-screen border-t" : "max-h-0"
        }`}
      >
        <div className="space-y-1 bg-white px-5 py-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50 hover:text-[#28355E]"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/admission"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-xl bg-[#28355E] py-3 text-center font-semibold text-white transition hover:bg-[#28355E]"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </header>
    <WhatsAppButton/>
      </>
  );
}