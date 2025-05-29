"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, X, Scan, Keyboard } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/lib/types"
import { toast } from "sonner"

interface BarcodeScannerProps {
  onScanSuccess?: (product: Product) => void
  onScanError?: (error: string) => void
}

export function BarcodeScanner({ onScanSuccess, onScanError }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [manualBarcode, setManualBarcode] = useState("")
  const [scanMode, setScanMode] = useState<"camera" | "manual">("manual")
  const scannerRef = useRef<any>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const searchProductByBarcode = async (barcode: string) => {
    try {
      const { data: product, error } = await supabase.from("products").select("*").eq("barcode", barcode).single()

      if (error || !product) {
        toast.error("Product not found with this barcode")
        onScanError?.("Product not found")
        return
      }

      setScannedProduct(product)
      onScanSuccess?.(product)
      toast.success(`Product found: ${product.name}`)
    } catch (error) {
      toast.error("Error searching for product")
      onScanError?.("Error searching for product")
    }
  }

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualBarcode.trim()) return

    setIsLoading(true)
    await searchProductByBarcode(manualBarcode.trim())
    setIsLoading(false)
  }

  const startCameraScanning = async () => {
    setIsScanning(true)
    setIsLoading(true)

    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
        },
      })
      streamRef.current = stream

      // Import html5-qrcode dynamically
      const { Html5Qrcode } = await import("html5-qrcode")

      const html5QrCode = new Html5Qrcode("qr-reader")

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Stop scanning
          await html5QrCode.stop()
          setIsScanning(false)
          await searchProductByBarcode(decodedText)
        },
        (error) => {
          // Ignore scanning errors (they happen frequently)
        },
      )

      scannerRef.current = html5QrCode
      setIsLoading(false)
    } catch (error) {
      console.error("Error starting camera scanner:", error)
      toast.error("Failed to access camera. Please check permissions or use manual input.")
      setIsScanning(false)
      setIsLoading(false)
      setScanMode("manual")
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current = null
      } catch (error) {
        console.error("Error stopping scanner:", error)
      }
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    setIsScanning(false)
    setIsLoading(false)
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          Barcode Scanner
        </CardTitle>
        <CardDescription>Scan product barcodes to quickly find and manage inventory</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode Selection */}
        <div className="flex gap-2">
          <Button
            variant={scanMode === "manual" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setScanMode("manual")
              if (isScanning) stopScanning()
            }}
            className="flex-1"
          >
            <Keyboard className="h-4 w-4 mr-2" />
            Manual Input
          </Button>
          <Button
            variant={scanMode === "camera" ? "default" : "outline"}
            size="sm"
            onClick={() => setScanMode("camera")}
            className="flex-1"
          >
            <Camera className="h-4 w-4 mr-2" />
            Camera Scan
          </Button>
        </div>

        {scanMode === "manual" ? (
          /* Manual Input Mode */
          <form onSubmit={handleManualSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="barcode">Enter Barcode</Label>
              <Input
                id="barcode"
                type="text"
                placeholder="Enter or scan barcode here..."
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !manualBarcode.trim()}>
              {isLoading ? "Searching..." : "Search Product"}
            </Button>
          </form>
        ) : (
          /* Camera Scanning Mode */
          <div className="space-y-4">
            {!isScanning ? (
              <Button onClick={startCameraScanning} className="w-full" disabled={isLoading}>
                <Camera className="h-4 w-4 mr-2" />
                {isLoading ? "Starting Camera..." : "Start Camera Scanning"}
              </Button>
            ) : (
              <div className="space-y-4">
                <div
                  id="qr-reader"
                  className="w-full min-h-[300px] flex items-center justify-center border rounded-lg bg-black"
                >
                  {isLoading && (
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-sm">Loading camera...</p>
                    </div>
                  )}
                </div>
                <Button onClick={stopScanning} variant="outline" className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Stop Scanning
                </Button>
              </div>
            )}
          </div>
        )}

        {scannedProduct && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Found Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{scannedProduct.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {scannedProduct.sku}</p>
                  {scannedProduct.barcode && (
                    <p className="text-sm text-muted-foreground">Barcode: {scannedProduct.barcode}</p>
                  )}
                </div>
                <Badge variant={scannedProduct.quantity > scannedProduct.min_stock_level ? "default" : "destructive"}>
                  {scannedProduct.quantity} in stock
                </Badge>
              </div>
              {scannedProduct.retail_price && (
                <p className="text-sm">Price: ${scannedProduct.retail_price.toFixed(2)}</p>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
