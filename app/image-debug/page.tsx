"use client"

import { useState, useEffect } from "react"
import { getProducts } from "../actions/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isImageUrlValid } from "../utils/image-validator"
import type { Product } from "../actions/products"

export default function ImageDebugPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageStatuses, setImageStatuses] = useState<Record<string, boolean>>({})
  const [testUrl, setTestUrl] = useState("")
  const [testResult, setTestResult] = useState<{ valid: boolean; message: string } | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)

        // Test the first 5 product images
        const sampleProducts = data.slice(0, 5)
        const statuses: Record<string, boolean> = {}

        for (const product of sampleProducts) {
          if (product.image_url) {
            const isValid = await isImageUrlValid(product.image_url)
            statuses[product.style] = isValid
          }
        }

        setImageStatuses(statuses)
      } catch (err) {
        console.error("Error loading products:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleTestUrl = async () => {
    if (!testUrl.trim()) {
      setTestResult({ valid: false, message: "Please enter a URL" })
      return
    }

    try {
      setTestResult(null)
      const isValid = await isImageUrlValid(testUrl)
      setTestResult({
        valid: isValid,
        message: isValid ? "Image loaded successfully" : "Failed to load image",
      })
    } catch (err) {
      setTestResult({
        valid: false,
        message: "Error testing URL: " + (err instanceof Error ? err.message : String(err)),
      })
    }
  }

  const testProductImage = async (product: Product) => {
    setSelectedProduct(product)
    if (product.image_url) {
      const isValid = await isImageUrlValid(product.image_url)
      setImageStatuses((prev) => ({
        ...prev,
        [product.style]: isValid,
      }))
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Image Debugging Tool</h1>

      <Tabs defaultValue="test">
        <TabsList className="mb-4">
          <TabsTrigger value="test">Test URL</TabsTrigger>
          <TabsTrigger value="products">Product Images</TabsTrigger>
          <TabsTrigger value="selected">Selected Product</TabsTrigger>
        </TabsList>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Test Image URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    placeholder="Enter image URL to test"
                  />
                </div>

                <Button onClick={handleTestUrl}>Test URL</Button>

                {testResult && (
                  <div className={`p-4 rounded-md ${testResult.valid ? "bg-green-100" : "bg-red-100"}`}>
                    <p className={testResult.valid ? "text-green-700" : "text-red-700"}>{testResult.message}</p>
                  </div>
                )}

                {testUrl && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Preview:</h3>
                    <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center">
                      <img
                        src={testUrl || "/placeholder.svg"}
                        alt="Test image"
                        className="max-h-64 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Error+Loading+Image"
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading products...</p>
                </div>
              ) : error ? (
                <div className="bg-red-100 p-4 rounded-md text-red-700">{error}</div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.slice(0, 9).map((product) => (
                      <div
                        key={product.style}
                        className="border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => testProductImage(product)}
                      >
                        <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                          <div>
                            <span className="font-medium">Style: {product.style}</span>
                            {imageStatuses[product.style] !== undefined && (
                              <span
                                className={`ml-2 inline-block w-3 h-3 rounded-full ${
                                  imageStatuses[product.style] ? "bg-green-500" : "bg-red-500"
                                }`}
                              ></span>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Test
                          </Button>
                        </div>
                        <div className="aspect-square relative">
                          <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = `/placeholder.svg?height=200&width=200&text=Style+${product.style}`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selected">
          <Card>
            <CardHeader>
              <CardTitle>Selected Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProduct ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Product Information</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium">Style:</span>
                          <span className="col-span-2">{selectedProduct.style}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium">Name:</span>
                          <span className="col-span-2">{selectedProduct.name}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium">Category:</span>
                          <span className="col-span-2">{selectedProduct.category}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <span className="font-medium">Image Status:</span>
                          <span className="col-span-2">
                            {imageStatuses[selectedProduct.style] !== undefined ? (
                              <span
                                className={imageStatuses[selectedProduct.style] ? "text-green-600" : "text-red-600"}
                              >
                                {imageStatuses[selectedProduct.style] ? "Valid" : "Invalid"}
                              </span>
                            ) : (
                              "Not tested"
                            )}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-medium mt-6 mb-4">Image URL</h3>
                      <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-32 text-sm break-all">
                        {selectedProduct.image_url || "No image URL"}
                      </div>

                      <div className="mt-4 space-x-2">
                        <Button onClick={() => testProductImage(selectedProduct)} variant="outline">
                          Test Image
                        </Button>
                        <Button
                          onClick={() => window.open(selectedProduct.image_url, "_blank")}
                          variant="outline"
                          disabled={!selectedProduct.image_url}
                        >
                          Open in New Tab
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Image Preview</h3>
                      <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-center h-80">
                        {selectedProduct.image_url ? (
                          <img
                            src={selectedProduct.image_url || "/placeholder.svg"}
                            alt={selectedProduct.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = `/placeholder.svg?height=300&width=300&text=Style+${selectedProduct.style}`
                            }}
                          />
                        ) : (
                          <div className="text-gray-500">No image available</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Select a product from the "Product Images" tab to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
