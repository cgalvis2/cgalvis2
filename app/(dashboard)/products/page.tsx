"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit2, Trash2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { createBrowserClient } from "@supabase/ssr"

interface Product {
  id: string
  name: string
  sku: string
  barcode?: string
  quantity: number
  min_stock_level: number
  cost_price?: number
  retail_price?: number
  category_id?: string
  supplier_id?: string
  description?: string
  created_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id)
      if (error) throw error
      setProducts(products.filter((p) => p.id !== id))
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch =
        (product.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
        (product.sku?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
        (product.barcode?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || !selectedCategory || product.category_id === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name ?? "").localeCompare(b.name ?? "")
        case "sku":
          return (a.sku ?? "").localeCompare(b.sku ?? "")
        case "quantity":
          return b.quantity - a.quantity
        case "price":
          return (b.retail_price ?? 0) - (a.retail_price ?? 0)
        default:
          return 0
      }
    })

  const lowStockCount = products.filter((p) => p.quantity <= p.min_stock_level).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory with {products.length} products</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Update product details" : "Fill in the details to create a new product"}
              </DialogDescription>
            </DialogHeader>
            <div className="text-muted-foreground">Form component needed here</div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(products.reduce((sum, p) => sum + (p.retail_price ? p.retail_price * p.quantity : 0), 0) / 100).toFixed(
                2,
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="sku">SKU</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>{filteredAndSortedProducts.length} products found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">SKU</TableHead>
                  <TableHead className="hidden md:table-cell">Barcode</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="hidden lg:table-cell text-right">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {product.sku}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{product.barcode || "-"}</TableCell>
                      <TableCell className="text-right font-medium">{product.quantity}</TableCell>
                      <TableCell className="hidden lg:table-cell text-right">
                        ${(product.retail_price ?? 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.quantity <= product.min_stock_level ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            In Stock
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(product)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm("Are you sure?")) {
                                deleteProduct(product.id)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
