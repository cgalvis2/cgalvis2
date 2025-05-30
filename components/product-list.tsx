"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { ProductFeatures } from "./product-features"
import { ProductImage } from "./product-image"
import { generatePDF } from "@/app/utils/pdf-generator"
import type { Product } from "@/app/actions/products"
import { getProductImage } from "@/app/utils/product-images"
import { useLanguage } from "@/app/contexts/language-context"

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const { t } = useLanguage()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const handleProductSelect = (styleId: string) => {
    setSelectedProducts((prev) => (prev.includes(styleId) ? prev.filter((id) => id !== styleId) : [...prev, styleId]))
  }

  const handleDownloadPDF = () => {
    const selectedProductData = products
      .filter((product) => selectedProducts.includes(product.style))
      .map((product) => {
        // Check if the image URL is from Shopify and use local image instead
        const imageUrl =
          product.image_url && product.image_url.includes("cdn.shopify.com")
            ? getProductImage(product.style)
            : product.image_url

        return {
          style: product.style,
          name: product.name,
          sizes: product.sizes,
          control: product.control,
          retail: product.retail_price,
          disc65: product.disc_65,
          disc70: product.disc_70,
          disc73: product.disc_73,
          image_url: imageUrl,
        }
      })
    generatePDF(selectedProductData, customerInfo)
  }

  const handleDownloadFullCatalog = () => {
    const allProductData = products.map((product) => {
      // Check if the image URL is from Shopify and use local image instead
      const imageUrl =
        product.image_url && product.image_url.includes("cdn.shopify.com")
          ? getProductImage(product.style)
          : product.image_url

      return {
        style: product.style,
        name: product.name,
        sizes: product.sizes,
        control: product.control,
        retail: product.retail_price,
        disc65: product.disc_65,
        disc70: product.disc_70,
        disc73: product.disc_73,
        image_url: imageUrl,
      }
    })
    generatePDF(allProductData, customerInfo)
  }

  const getCategoryTranslation = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Waist Training": t("category.waistTraining"),
      "Full Body": t("category.fullBody"),
      Bodysuit: t("category.bodysuit"),
      "Butt Lifter": t("category.buttLifter"),
      Shorts: t("category.shorts"),
      "Support Bra": t("category.supportBra"),
      Leggings: t("category.leggings"),
    }
    return categoryMap[category] || category
  }

  const getControlTranslation = (control: string) => {
    const controlMap: Record<string, string> = {
      "Extra-Firm": t("control.extraFirm"),
      "Extra Firm": t("control.extraFirm"),
      Firm: t("control.firm"),
      Medium: t("control.medium"),
      Light: t("control.light"),
    }
    return controlMap[control] || control
  }

  return (
    <section id="product-catalog" className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold">{t("products.title")}</h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button
              onClick={handleDownloadFullCatalog}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto"
              disabled={products.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="truncate">{t("products.downloadFull")}</span>
            </Button>
            {selectedProducts.length > 0 && (
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50 w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="truncate">
                  {t("products.downloadSelected")} ({selectedProducts.length})
                </span>
              </Button>
            )}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t("products.noProducts")}</h3>
            <p className="text-gray-500 max-w-md mx-auto">{t("products.noProductsDesc")}</p>
          </div>
        ) : (
          /* Product Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.style}
                className={`cursor-pointer transition-all hover:shadow-lg group ${
                  selectedProducts.includes(product.style)
                    ? "ring-2 ring-purple-500 bg-purple-50 shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleProductSelect(product.style)}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      productName={product.name}
                      productStyle={product.style}
                      className="w-full h-48 rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="font-mono bg-white/90 backdrop-blur-sm">
                        {product.style}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedProducts.includes(product.style)
                            ? "bg-purple-600 border-purple-600"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {selectedProducts.includes(product.style) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    {/* Enhanced Category Badge */}
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          product.category === "Waist Training"
                            ? "bg-purple-100 text-purple-800"
                            : product.category === "Full Body"
                              ? "bg-indigo-100 text-indigo-800"
                              : product.category === "Bodysuit"
                                ? "bg-pink-100 text-pink-800"
                                : product.category === "Butt Lifter"
                                  ? "bg-rose-100 text-rose-800"
                                  : product.category === "Shorts"
                                    ? "bg-orange-100 text-orange-800"
                                    : product.category === "Support Bra"
                                      ? "bg-green-100 text-green-800"
                                      : product.category === "Leggings"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                        } border-white/50 backdrop-blur-sm`}
                      >
                        {product.category === "Waist Training"
                          ? "⚡"
                          : product.category === "Full Body"
                            ? "👗"
                            : product.category === "Bodysuit"
                              ? "👙"
                              : product.category === "Butt Lifter"
                                ? "🍑"
                                : product.category === "Shorts"
                                  ? "🩲"
                                  : product.category === "Support Bra"
                                    ? "👙"
                                    : product.category === "Leggings"
                                      ? "🦵"
                                      : "✨"}{" "}
                        {getCategoryTranslation(product.category)}
                      </Badge>
                    </div>
                    {/* Control Level Badge */}
                    <div className="absolute bottom-2 right-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          product.control === "Extra-Firm" || product.control === "Extra Firm"
                            ? "bg-red-100/90 text-red-800 border-red-300/50"
                            : "bg-blue-100/90 text-blue-800 border-blue-300/50"
                        } backdrop-blur-sm`}
                      >
                        {getControlTranslation(product.control)}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h4>
                    <ProductFeatures productName={product.name} control={product.control} />

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.sizes}</span>
                      <span className="text-lg font-bold text-gray-900">${product.retail_price.toFixed(2)}</span>
                    </div>

                    {/* Wholesale Prices */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">65% Off:</span>
                        <span className="font-semibold text-green-600">${product.disc_65.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">70% Off:</span>
                        <span className="font-semibold text-blue-600">${product.disc_70.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">73% Off:</span>
                        <span className="font-semibold text-purple-600">${product.disc_73.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Savings Badge */}
                    <div className="mt-3 text-center">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        {t("products.saveUpTo")} ${(product.retail_price - product.disc_73).toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
