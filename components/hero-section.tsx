"use client"

import { Star, Shield, Truck } from "lucide-react"
import { useLanguage } from "@/app/contexts/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">{t("hero.title")}</h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">{t("hero.description")}</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <span className="font-semibold text-sm sm:text-base">{t("hero.premiumQuality")}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span className="font-semibold text-sm sm:text-base">{t("hero.trustedBrand")}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="font-semibold text-sm sm:text-base">{t("hero.fastShipping")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
