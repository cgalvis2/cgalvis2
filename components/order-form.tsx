"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import type { Customer, Product } from "@/lib/types"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

interface OrderFormProps {
  onSuccess?: () => void
}

interface OrderItemRow {
  productId: string
  quantity: number
  unitPrice: number
}

export function OrderForm({ onSuccess }: OrderFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [orderItems, setOrderItems] = useState<OrderItemRow[]>([{ productId: "", quantity: 1, unitPrice: 0 }])
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCustomersAndProducts()
  }, [])

  const fetchCustomersAndProducts = async () => {
    try {
      const [customersRes, productsRes] = await Promise.all([
        supabase.from("customers").select("*"),
        supabase.from("products").select("*"),
      ])

      setCustomers(customersRes.data || [])
      setProducts(productsRes.data || [])
    } catch (error) {
      toast.error("Failed to load data")
    }
  }

  const handleAddItem = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1, unitPrice: 0 }])
  }

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find((p) => p.id === productId)
    const newItems = [...orderItems]
    newItems[index].productId = productId
    newItems[index].unitPrice = product?.retail_price || 0
    setOrderItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCustomer) {
      toast.error("Please select a customer")
      return
    }

    if (orderItems.some((item) => !item.productId || item.quantity <= 0)) {
      toast.error("Please fill in all order items")
      return
    }

    try {
      setLoading(true)

      // Generate order number
      const orderNumber = `ORD-${Date.now()}`

      // Calculate total
      const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            order_number: orderNumber,
            customer_id: selectedCustomer,
            status: "pending",
            total_amount: totalAmount,
            notes,
          },
        ])
        .select()

      if (orderError) throw orderError

      const orderId = orderData[0].id

      // Create order items
      const orderItemsToInsert = orderItems.map((item) => ({
        order_id: orderId,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.quantity * item.unitPrice,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItemsToInsert)

      if (itemsError) throw itemsError

      toast.success("Order created successfully")
      onSuccess?.()
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Failed to create order")
    } finally {
      setLoading(false)
    }
  }

  const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="customer">Customer</Label>
        <select
          id="customer"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm mt-2"
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Order Items</Label>
        <div className="space-y-3 mt-2">
          {orderItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <select
                  value={item.productId}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.retail_price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-20">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...orderItems]
                    newItems[index].quantity = Number.parseInt(e.target.value) || 1
                    setOrderItems(newItems)
                  }}
                  placeholder="Qty"
                />
              </div>
              <div className="w-24">
                <Input type="number" disabled value={item.unitPrice.toFixed(2)} placeholder="Price" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveItem(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" className="w-full mt-3 gap-2 bg-transparent" onClick={handleAddItem}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          placeholder="Order notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Order"}
      </Button>
    </form>
  )
}
