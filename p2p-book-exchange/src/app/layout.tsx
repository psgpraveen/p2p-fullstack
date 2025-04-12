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
  title: {
    default: "P2P Book Exchange - Discover and Share Books",
    template: "%s | P2P Book Exchange",
  },
  description:
    "Join the P2P Book Exchange community to share, explore, and discover books with fellow book lovers.",
  keywords: [
    "P2P Book Exchange",
    "book sharing",
    "book community",
    "exchange books",
    "readers club",
  ],
  metadataBase: new URL("https://p2p-fullstack.vercel.app"),
  openGraph: {
    title: "P2P Book Exchange - Discover and Share Books",
    description:
      "Discover, exchange, and share your favorite books with fellow book lovers.",
    url: "https://p2p-fullstack.vercel.app",
    siteName: "P2P Book Exchange",
    images: [
      {
        url: "https://p2p-fullstack.vercel.app/_next/image?url=%2Fimage.png&w=828&q=75",
        width: 1200,
        height: 630,
        alt: "P2P Book Exchange",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P2P Book Exchange",
    description: "Join our community to discover and share books!",
    images: ["https://p2p-fullstack.vercel.app/_next/image?url=%2Fimage.png&w=828&q=75"],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
