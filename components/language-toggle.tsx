"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 h-8 ${
          language === "en" ? "bg-purple-600 text-white hover:bg-purple-700" : "hover:bg-gray-100"
        }`}
      >
        <span className="text-lg mr-1">🇺🇸</span>
        <span className="text-xs font-medium">EN</span>
      </Button>
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className={`px-2 py-1 h-8 ${
          language === "es" ? "bg-purple-600 text-white hover:bg-purple-700" : "hover:bg-gray-100"
        }`}
      >
        <span className="text-lg mr-1">🇪🇸</span>
        <span className="text-xs font-medium">ES</span>
      </Button>
    </div>
  )
}
