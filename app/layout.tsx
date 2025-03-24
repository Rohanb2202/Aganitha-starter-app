import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Aganitha Cognitive Solutions",
  description: "AI-powered solutions for pharmaceutical research and development",
  metadataBase: new URL("https://aganitha.ai"),
  icons: {
    icon: "/aganitha-logo.png", // Use the PNG directly
  },
  openGraph: {
    title: "Aganitha Cognitive Solutions",
    description: "AI-powered solutions for pharmaceutical research and development",
    url: "https://aganitha.ai",
    siteName: "Aganitha",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aganitha Cognitive Solutions",
    description: "AI-powered solutions for pharmaceutical research and development",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}