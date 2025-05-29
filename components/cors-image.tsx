"use client"

import { useState, useEffect } from "react"
import { getProductImage } from "@/app/utils/product-images"

interface CorsImageProps {
  src: string | null | undefined
  alt: string
  productStyle: string
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export function CorsImage({ src, alt, productStyle, className = "", onLoad, onError }: CorsImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate a fallback image URL
  const fallbackImageUrl = `/placeholder.svg?height=300&width=300&text=Style+${productStyle}&bg=8B5CF6&textColor=white`

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true)
    setHasError(false)

    // Determine the image source - never use empty string
    const sourceUrl = src && src.trim() !== "" ? src : getProductImage(productStyle) || fallbackImageUrl

    // Check if it's a Shopify CDN URL
    const isShopifyUrl = sourceUrl.includes("cdn.shopify.com")

    if (isShopifyUrl) {
      // For Shopify URLs, we'll try to load them directly first
      setImageSrc(sourceUrl)

      // Also preload the image to check if it loads
      const img = new Image()
      img.onload = () => {
        setIsLoading(false)
        onLoad?.()
      }
      img.onerror = () => {
        console.warn(`Direct Shopify image failed to load: ${sourceUrl}`)
        setHasError(true)
        setIsLoading(false)
        onError?.()

        // Fall back to the local image or placeholder
        setImageSrc(getProductImage(productStyle) || fallbackImageUrl)
      }
      img.src = sourceUrl
    } else {
      // For non-Shopify URLs, just use them directly
      setImageSrc(sourceUrl)
      setIsLoading(false)
    }
  }, [src, productStyle, fallbackImageUrl, onLoad, onError])

  const handleImageError = () => {
    console.error(`Image error for: ${imageSrc}`)
    setHasError(true)
    setIsLoading(false)
    onError?.()

    // If the current source failed, try the fallback
    if (imageSrc !== fallbackImageUrl) {
      setImageSrc(fallbackImageUrl)
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      )}

      <img
        src={imageSrc || fallbackImageUrl}
        alt={alt}
        className={`w-full h-full object-contain ${isLoading ? "opacity-0" : "opacity-100"}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />

      {/* Error message for debugging */}
      {hasError && process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1 text-center">
          Image failed to load
        </div>
      )}
    </div>
  )
}
