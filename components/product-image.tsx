"use client"

import { useState } from "react"
import { ZoomIn } from "lucide-react"
import { ImageZoomModal } from "./image-zoom-modal"
import { CorsImage } from "./cors-image"
import { useLanguage } from "@/app/contexts/language-context"

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  productName: string
  productStyle: string
  className?: string
}

export function ProductImage({ src, alt, productName, productStyle, className = "" }: ProductImageProps) {
  const { t } = useLanguage()
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <div className={`relative group overflow-hidden ${className}`}>
        <CorsImage
          src={src}
          alt={alt}
          productStyle={productStyle}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true)
            setIsLoading(false)
          }}
        />

        {/* Zoom Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300"
            onClick={() => setIsZoomOpen(true)}
          >
            <ZoomIn className="w-5 h-5 text-gray-800" />
          </div>
        </div>

        {/* Click hint */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t("products.clickToZoom")}
        </div>

        {/* Style number badge for fallback images */}
        {imageError && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="font-bold text-lg text-purple-600">Style {productStyle}</div>
          </div>
        )}
      </div>

      <ImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageSrc={src}
        imageAlt={alt}
        productName={productName}
        productStyle={productStyle}
      />
    </>
  )
}
