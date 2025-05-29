"use client"

import { useState, useEffect } from "react"
import { getProductImage } from "@/app/utils/product-images"
import { isBlockedShopifyUrl, getProxiedImageUrl } from "@/app/utils/image-proxy"

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

    // Check if the source is a blocked Shopify URL
    const isBlocked = src && isBlockedShopifyUrl(src)

    if (isBlocked) {
      console.log(`Blocked Shopify URL detected, using local fallback for style ${productStyle}: ${src}`)
      // Use local image immediately for blocked URLs
      const localImage = getProductImage(productStyle)
      setImageSrc(localImage || fallbackImageUrl)
      setIsLoading(false)
    } else if (src && src.trim() !== "") {
      // For working URLs (including vedettestore.com Shopify URLs), try to use them
      const proxiedUrl = getProxiedImageUrl(src)
      if (proxiedUrl) {
        console.log(`Using working URL for style ${productStyle}: ${proxiedUrl}`)
        setImageSrc(proxiedUrl)
      } else {
        console.log(`URL was blocked by proxy, using local fallback for style ${productStyle}: ${src}`)
        const localImage = getProductImage(productStyle)
        setImageSrc(localImage || fallbackImageUrl)
        setIsLoading(false)
      }
    } else {
      // No src provided, use local image
      console.log(`No src provided, using local image for style ${productStyle}`)
      const localImage = getProductImage(productStyle)
      setImageSrc(localImage || fallbackImageUrl)
      setIsLoading(false)
    }
  }, [src, productStyle, fallbackImageUrl])

  const handleImageError = () => {
    console.error(`Image error for style ${productStyle}: ${imageSrc}`)
    setHasError(true)
    setIsLoading(false)

    // Call the optional onError callback
    if (onError) {
      onError()
    }

    // If the current source failed, try the local fallback
    const localImage = getProductImage(productStyle)
    if (imageSrc !== localImage && localImage) {
      console.log(`Falling back to local image for style ${productStyle}: ${localImage}`)
      setImageSrc(localImage)
      setHasError(false) // Reset error for the new attempt
    } else if (imageSrc !== fallbackImageUrl) {
      console.log(`Falling back to placeholder for style ${productStyle}: ${fallbackImageUrl}`)
      setImageSrc(fallbackImageUrl)
      setHasError(false) // Reset error for the new attempt
    }
  }

  const handleImageLoad = () => {
    console.log(`Successfully loaded image for style ${productStyle}: ${imageSrc}`)
    setIsLoading(false)
    setHasError(false)

    // Call the optional onLoad callback
    if (onLoad) {
      onLoad()
    }
  }

  // Ensure imageSrc is never an empty string
  const finalImageSrc = imageSrc || fallbackImageUrl

  return (
    <div className={`relative ${className}`}>
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      )}

      <img
        src={finalImageSrc || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-contain ${isLoading && !hasError ? "opacity-0" : "opacity-100"}`}
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
