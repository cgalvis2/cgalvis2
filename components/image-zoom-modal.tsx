"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CorsImage } from "./cors-image"

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string | null | undefined
  imageAlt: string
  productName: string
  productStyle: string
}

export function ImageZoomModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  productName,
  productStyle,
}: ImageZoomModalProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
      setIsLoading(true)
    }
  }, [isOpen])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "+":
        case "=":
          e.preventDefault()
          handleZoomIn()
          break
        case "-":
          e.preventDefault()
          handleZoomOut()
          break
        case "0":
          e.preventDefault()
          handleReset()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev * 1.5, 5))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev / 1.5, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale((prev) => Math.max(0.5, Math.min(5, prev * delta)))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">{productName}</h3>
            <p className="text-sm text-gray-300">Style: {productStyle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>

          <span className="text-white text-sm font-medium min-w-[60px] text-center">{Math.round(scale * 100)}%</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= 5}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/30 mx-2" />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="text-white hover:bg-white/20"
            title="Reset (0)"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          {scale > 1 && (
            <>
              <div className="w-px h-6 bg-white/30 mx-2" />
              <div className="flex items-center space-x-1 text-white text-xs">
                <Move className="w-3 h-3" />
                <span>Drag to pan</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center p-16 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={(e) => {
          // Close modal if clicking on background (not on image)
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        {/* Image with transform for zoom and pan */}
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: "center center",
          }}
          className={`max-w-full max-h-full transition-all duration-300 ease-out select-none ${
            isDragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-default"
          }`}
        >
          <CorsImage
            src={imageSrc}
            alt={imageAlt}
            productStyle={productStyle}
            className="max-w-full max-h-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute top-20 right-4 text-white text-sm bg-black/50 backdrop-blur-sm rounded-lg p-3 max-w-xs">
        <h4 className="font-semibold mb-2">Controls:</h4>
        <ul className="space-y-1 text-xs">
          <li>• Scroll wheel to zoom</li>
          <li>• Drag to pan when zoomed</li>
          <li>• Press ESC to close</li>
          <li>• Press +/- to zoom</li>
          <li>• Press 0 to reset</li>
        </ul>
      </div>
    </div>
  )
}
