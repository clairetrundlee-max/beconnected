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
  title: "Connected. — Social planning",
  description: "See who’s free, plan together, make it happen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="min-h-dvh bg-neutral-300 flex justify-center supports-[min-height:100dvh]:min-h-dvh">
          <div className="relative w-full max-w-[430px] min-h-dvh bg-white shadow-2xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
