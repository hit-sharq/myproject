import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ArtAfrik - Celebrating African Creativity Worldwide",
  description: "Discover and explore authentic African artworks from talented artists across the continent.",
  openGraph: {
    title: "ArtAfrik - Celebrating African Creativity Worldwide",
    description: "Discover and explore authentic African artworks from talented artists across the continent.",
    url: "https://artafrik.com",
    siteName: "ArtAfrik",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArtAfrik - Celebrating African Creativity Worldwide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
