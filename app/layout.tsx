import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"

export const metadata: Metadata = {
  title: "Vedette Shapewear Wholesale Price List 2025",
  description: "Official wholesale price list for Vedette Shapewear products",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden max-w-[100vw]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
