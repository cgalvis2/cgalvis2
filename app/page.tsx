"use client"

import { useState, useEffect } from "react"
import { productImages } from "./utils/product-images"
import { preloadImagesInBatches } from "./utils/image-preloader"
import { preloadSupabaseImages } from "./utils/preload-supabase-images"
import { getProducts } from "./actions/products"
import { ProductList } from "@/components/product-list"
import { WholesaleTerms } from "@/components/wholesale-terms"
import { CustomerInfoForm } from "@/components/customer-info-form"
import { HeroSection } from "@/components/hero-section"
import { ContactSection } from "@/components/contact-section"
import { LanguageToggle } from "@/components/language-toggle"
import type { Product } from "./actions/products"
import { useLanguage } from "./contexts/language-context"
import Header from "@/components/header"

export default function VedetteWholesale() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingProducts(true)
        setError(null)

        // Load products from Supabase
        const productsData = await getProducts()

        if (productsData.length === 0) {
          setError(t("error.noProducts"))
          setIsLoadingProducts(false)
          setIsLoadingImages(false)
          return
        }

        setProducts(productsData)
        console.log("Loaded products:", productsData.length)

        // Preload images
        setIsLoadingImages(true)

        // First preload local fallback images
        await preloadImagesInBatches(Object.values(productImages), 5, 300)

        // Then preload Supabase images if available
        if (productsData.length > 0) {
          await preloadSupabaseImages(productsData, 5, 300)
        }
      } catch (err) {
        console.error("Error loading data:", err)
        setError(t("error.loadFailed"))
      } finally {
        setIsLoadingProducts(false)
        setIsLoadingImages(false)
      }
    }

    loadData()
  }, [t])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />

      {/* Loading overlay */}
      {(isLoadingProducts || isLoadingImages) && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-800 font-medium">
              {isLoadingProducts ? t("loading.products") : t("loading.images")}
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="fixed top-4 inset-x-0 mx-auto max-w-md z-50">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg">
            <div className="flex items-center">
              <div className="py-1">
                <svg className="w-6 h-6 mr-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold">{t("error.title")}</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Controls */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("header.title")}
              </h1>
              <p className="text-gray-600 text-sm">{t("header.subtitle")}</p>
            </div>

            <div className="flex items-center">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      <HeroSection />
      <WholesaleTerms />
      <CustomerInfoForm />
      <ProductList products={products} />
      <ContactSection />
    </div>
  )
}
