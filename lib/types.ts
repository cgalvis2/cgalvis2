export interface Product {
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
  updated_at: string
  category?: Category
  supplier?: Supplier
}

export interface Category {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Supplier {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  created_at: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id?: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  notes?: string
  created_at: string
  updated_at: string
  customer?: Customer
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  product?: Product
}

export interface StockMovement {
  id: string
  product_id: string
  movement_type: "in" | "out" | "adjustment"
  quantity: number
  reference_type?: string
  reference_id?: string
  notes?: string
  created_at: string
  product?: Product
}
