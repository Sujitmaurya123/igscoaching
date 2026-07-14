import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
               {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
  <div className="flex h-20 w-20 items-center justify-center bg-white shadow rounded-3xl overflow-hidden  ">
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

            <p className="mt-5 leading-7 text-gray-400">
              We provide quality education for students from Class 1 to 12,
              along with preparation for competitive exams through experienced
              faculty and modern teaching methods.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/courses" className="hover:text-blue-400">
                  Courses
                </Link>
              </li>

              <li>
                <Link href="/faculty" className="hover:text-blue-400">
                  Faculty
                </Link>
              </li>

              <li>
                <Link href="/gallery" className="hover:text-blue-400">
                  Gallery
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Our Courses
            </h3>

            <ul className="space-y-3">
              <li>Class 1 – 5</li>
              <li>Class 6 – 8</li>
              <li>Class 9 – 10</li>
              <li>Class 11 – 12</li>
              {/* <li>NEET Preparation</li>
              <li>IIT-JEE Foundation</li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 text-blue-400" />
                <p>
                  Vindhya Public Junior High School, Nadihar, Rajgarh, Mirzapur
                  <br />
                  Uttar Pradesh, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 7393917189,7318079820
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a
                  href="mailto:info@insightglobalstudies.in"
                  className="hover:text-white"
                >
                  info@insightglobalstudies.in
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="#"
                  className="rounded-full bg-slate-800 p-3 hover:bg-blue-600"
                >
                  <FaFacebookF className="h-5 w-5" />
                </Link>

                <Link
                  href="#"
                  className="rounded-full bg-slate-800 p-3 hover:bg-pink-600"
                >
                  <FaInstagram className="h-5 w-5" />
                </Link>

                <Link
                  href="#"
                  className="rounded-full bg-slate-800 p-3 hover:bg-red-600"
                >
                  <FaYoutube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>
              © {new Date().getFullYear()} IGS Coaching Classes. All
              Rights Reserved.
            </p>

            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}