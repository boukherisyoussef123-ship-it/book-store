import type { Metadata } from "next";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://book-store-ashy-nine.vercel.app"
  ),

  title: {
    default: "Book Store - Digital Library for Kids",
    template: "%s | Book Store",
  },

  description:
    "Discover a digital library of educational books, stories, activities, animals, and coloring books for kids.",

  keywords: [
    "kids books",
    "children books",
    "digital library",
    "educational books",
    "kids stories",
    "activity books",
    "coloring books",
    "kids reading",
    "كتب أطفال",
    "مكتبة رقمية",
    "كتب تعليمية للأطفال",
  ],

  authors: [{ name: "Book Store" }],
  creator: "Book Store",

  openGraph: {
    title: "Book Store - Digital Library for Kids",
    description:
      "Discover educational books, stories, activities, and coloring books for kids.",
    url: "https://book-store-ashy-nine.vercel.app",
    siteName: "Book Store",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body>
          <header className="flex justify-end p-4 border-b">
            <UserButton />
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}