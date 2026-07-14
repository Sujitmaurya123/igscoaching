import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    default: "IGS - Insight Global Studies | Best Coaching Institute",
    template: "%s | IGS - Insight Global Studies",
  },

  description:
    "IGS - Insight Global Studies is a leading coaching institute offering quality education for Class 1–12, Board Exams, JEE, NEET, CUET, SSC, Banking, UPSC, and other competitive examinations with experienced faculty and excellent results.",

  keywords: [
    "IGS",
    "Insight Global Studies",
    "Coaching Institute",
    "Best Coaching Classes",
    "Class 1 to 12 Coaching",
    "JEE Coaching",
    "NEET Coaching",
    "CUET Coaching",
    "SSC Coaching",
    "Banking Coaching",
    "UPSC Coaching",
    "Board Exam Preparation",
    "Online Coaching",
    "Offline Coaching",
    "Education",
    "Learning Center",
  ],

  authors: [{ name: "IGS - Insight Global Studies" }],
  creator: "IGS - Insight Global Studies",
  publisher: "IGS - Insight Global Studies",

  applicationName: "IGS - Insight Global Studies",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "IGS - Insight Global Studies",
    description:
      "Empowering students with quality education, expert faculty, smart learning, and proven success in board and competitive examinations.",
    url: "https://yourdomain.com",
    siteName: "IGS - Insight Global Studies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IGS - Insight Global Studies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "IGS - Insight Global Studies",
    description:
      "Join IGS - Insight Global Studies for quality education and expert coaching.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
