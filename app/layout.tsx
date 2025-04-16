import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import HamburgerMenu from "@/components/hamburger-menu"

// Load VT323 font with proper configuration
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
})

export const metadata: Metadata = {
  title: "n3w m00n",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${vt323.variable} font-vt323`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="scanlines"></div>
          <div className="noise"></div>
          <HamburgerMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'