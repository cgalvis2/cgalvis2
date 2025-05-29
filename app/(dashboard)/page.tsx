"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Product, Order, Customer } from "@/lib/types"
import Link from "next/link"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    lowStockItems: 0,
    totalRevenue: 0,
    monthlyGrowth: 12.5,
  })
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([])
  const [recentOrders, setRecentOrders] = useState<(Order & { customer?: Customer })[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats separately to avoid relationship issues
        const [productsRes, ordersRes, customersRes] = await Promise.all([
          supabase.from("products").select("id, quantity, min_stock_level, retail_price"),
          supabase.from("orders").select("*"),
          supabase.from("customers").select("id"),
        ])

        const products = productsRes.data || []
        const orders = ordersRes.data || []
        const customers = customersRes.data || []
        const lowStock = products.filter((p) => p.quantity <= p.min_stock_level)
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalCustomers: customers.length,
          lowStockItems: lowStock.length,
          totalRevenue,
          monthlyGrowth: 12.5,
        })

        // Fetch low stock products
        const { data: lowStockData } = await supabase
          .from("products")
          .select("*")
          .lte("quantity", "min_stock_level")
          .limit(5)

        setLowStockProducts(lowStockData || [])

        // Fetch recent orders and customers separately, then join manually
        const { data: recentOrdersData } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5)

        if (recentOrdersData && recentOrdersData.length > 0) {
          // Get customer data for these orders
          const customerIds = recentOrdersData.map((order) => order.customer_id).filter((id) => id !== null)

          const { data: customersData } = await supabase.from("customers").select("*").in("id", customerIds)

          // Manually join orders with customers
          const enrichedOrders = recentOrdersData.map((order) => ({
            ...order,
            customer: customersData?.find((customer) => customer.id === order.customer_id),
          }))

          setRecentOrders(enrichedOrders)
        } else {
          setRecentOrders([])
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your inventory.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>View Analytics</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />+{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <Activity className="h-3 w-3 mr-1" />
              Active inventory items
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              All time orders
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
              Items need restocking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.order_number}</TableCell>
                      <TableCell>{order.customer?.name || "Guest"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={order.status === "delivered" ? "default" : "secondary"}
                          className={order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">${order.total_amount.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No orders found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between space-x-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/20"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{product.name}</p>
                  <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant="destructive" className="text-xs">
                    {product.quantity} left
                  </Badge>
                  <Progress value={(product.quantity / product.min_stock_level) * 100} className="w-16 h-2" />
                </div>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>All products are well stocked</p>
              </div>
            )}
            <Button asChild className="w-full" variant="outline">
              <Link href="/inventory">Manage Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
