"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/app/contexts/language-context"

export default function Header() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={scrollToTop} className="flex items-center hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Vedette</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={scrollToTop} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("product-catalog")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              {t("nav.products")}
            </button>
            <button
              onClick={() => scrollToSection("contact-information")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollToSection("customer-information")}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              {t("nav.contact")}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">{isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t border-gray-100">
          <button
            onClick={scrollToTop}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-colors"
          >
            {t("nav.home")}
          </button>
          <button
            onClick={() => scrollToSection("product-catalog")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-colors"
          >
            {t("nav.products")}
          </button>
          <button
            onClick={() => scrollToSection("contact-information")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-colors"
          >
            {t("nav.about")}
          </button>
          <button
            onClick={() => scrollToSection("customer-information")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-colors"
          >
            {t("nav.contact")}
          </button>
        </div>
      </div>
    </header>
  )
}
