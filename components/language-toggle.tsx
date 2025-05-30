"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`px-3 py-2 h-10 rounded-l-lg rounded-r-none border-r border-gray-200 transition-all duration-200 ${
          language === "en"
            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
            : "hover:bg-gray-50 text-gray-700"
        }`}
      >
        <span className="text-xl mr-2">🇺🇸</span>
        <span className="text-sm font-medium hidden sm:inline">EN</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("es")}
        className={`px-3 py-2 h-10 rounded-r-lg rounded-l-none transition-all duration-200 ${
          language === "es"
            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
            : "hover:bg-gray-50 text-gray-700"
        }`}
      >
        <span className="text-xl mr-2">🇪🇸</span>
        <span className="text-sm font-medium hidden sm:inline">ES</span>
      </Button>
    </div>
  )
}
