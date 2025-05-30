import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"

export const metadata: Metadata = {
  title: "Vedette Shapewear - Wholesale Price List 2025",
  description: "Premium shapewear wholesale catalog with competitive pricing",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
