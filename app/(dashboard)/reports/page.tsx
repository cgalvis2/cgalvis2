"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Loader2, TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react"
import { toast } from "sonner"

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  topProducts: Array<{ name: string; quantity: number; revenue: number }>
  ordersByStatus: Array<{ status: string; count: number }>
  revenueByMonth: Array<{ month: string; revenue: number }>
}

export default function ReportsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      // Fetch orders, products, and customers
      const [ordersRes, productsRes, customersRes, orderItemsRes] = await Promise.all([
        supabase.from("orders").select("*"),
        supabase.from("products").select("*"),
        supabase.from("customers").select("*"),
        supabase.from("order_items").select("*"),
      ])

      const orders = ordersRes.data || []
      const products = productsRes.data || []
      const customers = customersRes.data || []
      const orderItems = orderItemsRes.data || []

      // Calculate metrics
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
      const totalOrders = orders.length
      const totalCustomers = customers.length
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      // Top products
      const productStats = products.map((product) => {
        const itemsForProduct = orderItems.filter((item) => item.product_id === product.id)
        const quantity = itemsForProduct.reduce((sum, item) => sum + item.quantity, 0)
        const revenue = itemsForProduct.reduce((sum, item) => sum + item.total_price, 0)

        return {
          name: product.name,
          quantity,
          revenue,
        }
      })

      const topProducts = productStats
        .filter((p) => p.quantity > 0)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)

      // Orders by status
      const ordersByStatus = [
        { status: "Pending", count: orders.filter((o) => o.status === "pending").length },
        { status: "Processing", count: orders.filter((o) => o.status === "processing").length },
        { status: "Shipped", count: orders.filter((o) => o.status === "shipped").length },
        { status: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
        { status: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
      ].filter((s) => s.count > 0)

      // Revenue by month (last 6 months)
      const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - (5 - i))
        const month = date.toLocaleDateString("en-US", { month: "short" })
        const monthOrders = orders.filter((order) => {
          const orderDate = new Date(order.created_at)
          return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear()
        })
        const revenue = monthOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)

        return { month, revenue }
      })

      setAnalytics({
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        topProducts,
        ordersByStatus,
        revenueByMonth,
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
      toast.error("Failed to load analytics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (!analytics) {
    return <div>No data available</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">View key business metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
            <p className="text-xs text-slate-500 mt-1">Completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCustomers}</div>
            <p className="text-xs text-slate-500 mt-1">Registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              Avg Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">Per order</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
            <CardDescription>Order status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.ordersByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics.ordersByStatus.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#ef4444"][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      {analytics.topProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => value} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
