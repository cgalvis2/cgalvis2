"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"

interface TouchZoomProps {
  children: React.ReactNode
  onZoomChange?: (scale: number) => void
  onPositionChange?: (position: { x: number; y: number }) => void
  minScale?: number
  maxScale?: number
  disabled?: boolean
}

export function TouchZoom({
  children,
  onZoomChange,
  onPositionChange,
  minScale = 0.5,
  maxScale = 5,
  disabled = false,
}: TouchZoomProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [lastTouchCenter, setLastTouchCenter] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const getTouchDistance = useCallback((touches: TouchList) => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2))
  }, [])

  const getTouchCenter = useCallback((touches: TouchList) => {
    if (touches.length === 1) {
      return { x: touches[0].clientX, y: touches[0].clientY }
    }
    if (touches.length >= 2) {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
      }
    }
    return { x: 0, y: 0 }
  }, [])

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (disabled || e.touches.length === 0) return

      if (e.touches.length === 2) {
        // Pinch gesture
        const distance = getTouchDistance(e.touches)
        const center = getTouchCenter(e.touches)
        setLastTouchDistance(distance)
        setLastTouchCenter(center)
      } else if (e.touches.length === 1) {
        // Single touch for panning
        const center = getTouchCenter(e.touches)
        setLastTouchCenter(center)
      }
    },
    [disabled, getTouchDistance, getTouchCenter],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (disabled || e.touches.length === 0) return

      e.preventDefault()

      if (e.touches.length === 2 && lastTouchDistance > 0) {
        // Pinch zoom
        const distance = getTouchDistance(e.touches)
        const scaleChange = distance / lastTouchDistance
        const newScale = Math.max(minScale, Math.min(maxScale, scale * scaleChange))

        setScale(newScale)
        setLastTouchDistance(distance)
        onZoomChange?.(newScale)
      } else if (e.touches.length === 1 && scale > 1) {
        // Pan when zoomed in
        const center = getTouchCenter(e.touches)
        const deltaX = center.x - lastTouchCenter.x
        const deltaY = center.y - lastTouchCenter.y

        const newPosition = {
          x: position.x + deltaX,
          y: position.y + deltaY,
        }

        setPosition(newPosition)
        setLastTouchCenter(center)
        onPositionChange?.(newPosition)
      }
    },
    [
      disabled,
      lastTouchDistance,
      scale,
      position,
      lastTouchCenter,
      getTouchDistance,
      getTouchCenter,
      minScale,
      maxScale,
      onZoomChange,
      onPositionChange,
    ],
  )

  const handleTouchEnd = useCallback(() => {
    setLastTouchDistance(0)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div
      ref={containerRef}
      className="touch-none"
      style={{
        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        transformOrigin: "center center",
        transition: disabled ? "none" : "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}
