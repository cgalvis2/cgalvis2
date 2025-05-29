"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarcodeScanner } from "@/components/barcode-scanner"
import { ProductForm } from "@/components/product-form"
import type { Product } from "@/lib/types"
import { Plus, Package, DollarSign, BarChart3 } from "lucide-react"

export default function ScannerPage() {
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null)
  const [showProductForm, setShowProductForm] = useState(false)

  const handleScanSuccess = (product: Product) => {
    setScannedProduct(product)
  }

  const handleScanError = (error: string) => {
    console.error("Scan error:", error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Barcode Scanner</h1>
        <p className="text-muted-foreground">Scan product barcodes to quickly find and manage inventory</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <BarcodeScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError} />

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common actions after scanning a product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => setShowProductForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Update Inventory
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {scannedProduct ? (
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Information for the scanned product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{scannedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {scannedProduct.sku}</p>
                    {scannedProduct.barcode && (
                      <p className="text-sm text-muted-foreground">Barcode: {scannedProduct.barcode}</p>
                    )}
                  </div>
                  <Badge variant={scannedProduct.quantity > scannedProduct.min_stock_level ? "default" : "destructive"}>
                    {scannedProduct.quantity} in stock
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cost Price</p>
                    <p className="text-lg">
                      {scannedProduct.cost_price ? `$${scannedProduct.cost_price.toFixed(2)}` : "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Retail Price</p>
                    <p className="text-lg">
                      {scannedProduct.retail_price ? `$${scannedProduct.retail_price.toFixed(2)}` : "N/A"}
                    </p>
                  </div>
                </div>

                {scannedProduct.description && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground">{scannedProduct.description}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <Button size="sm" className="flex-1">
                    <Package className="h-4 w-4 mr-2" />
                    Update Stock
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Add to Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Product Scanned</CardTitle>
                <CardDescription>Scan a barcode to view product details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Product details will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Scanner Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Ensure good lighting for better scanning</p>
              <p>• Hold the camera steady and at the right distance</p>
              <p>• Make sure the barcode is clearly visible</p>
              <p>• Works with both mobile camera and USB scanners</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProductForm open={showProductForm} onOpenChange={setShowProductForm} onSuccess={() => {}} />
    </div>
  )
}
