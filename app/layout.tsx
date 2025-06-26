import type { Metadata } from "next";
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
  title: "Mide's Atelier",
  description:
    "Mide's Atelier is a luxurious couture brand specializing in high-fashion bridal, ready-to-wear, and bespoke clothing for women. With a focus on timeless elegance and exquisite craftsmanship, each piece is carefully designed to tell a unique story. The brand seamlessly blends vintage luxury with modern chic, offering tailored designs that exude sophistication, warmth, and an organic, earthy-luxe aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
