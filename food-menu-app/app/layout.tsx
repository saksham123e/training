import "./globals.css";

import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Maison Menu",
  description: "Premium food delivery built with Next.js and Prisma.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${playfair.variable} flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
