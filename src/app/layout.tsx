import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
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
  title: "D-Secure File Eraser — Certified Data Erasure Software",
  description: "NIST 800-88 compliant secure data erasure software for Windows, Mac & Linux. Permanently delete files, folders, and partition traces beyond forensic recovery.",
  icons: {
    icon: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1759503993/ec8v6wcjdpwgpplobi3w.svg",
    apple: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1759503993/ec8v6wcjdpwgpplobi3w.svg",
  },
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
      suppressHydrationWarning // Browser extensions ke attributes se hone wali hydration mismatch warning ko rokne ke liye
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
