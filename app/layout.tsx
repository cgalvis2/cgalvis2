import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "./contexts/language-context"

export const metadata: Metadata = {
  title: "Responsive Header Example",
  description: "A responsive header design with no horizontal scrolling",
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
