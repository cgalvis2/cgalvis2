import { create } from "zustand"
import type { Product, Order, Customer, Category, Supplier } from "./types"

interface InventoryStore {
  products: Product[]
  orders: Order[]
  customers: Customer[]
  categories: Category[]
  suppliers: Supplier[]
  isLoading: boolean
  searchTerm: string
  selectedCategory: string
  sortBy: "name" | "sku" | "quantity" | "created_at"
  sortOrder: "asc" | "desc"

  setProducts: (products: Product[]) => void
  setOrders: (orders: Order[]) => void
  setCustomers: (customers: Customer[]) => void
  setCategories: (categories: Category[]) => void
  setSuppliers: (suppliers: Supplier[]) => void
  setLoading: (loading: boolean) => void
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  setSortBy: (sortBy: "name" | "sku" | "quantity" | "created_at") => void
  setSortOrder: (order: "asc" | "desc") => void

  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  removeProduct: (id: string) => void

  addOrder: (order: Order) => void
  updateOrder: (order: Order) => void
  removeOrder: (id: string) => void

  addCustomer: (customer: Customer) => void
  updateCustomer: (customer: Customer) => void
  removeCustomer: (id: string) => void
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  products: [],
  orders: [],
  customers: [],
  categories: [],
  suppliers: [],
  isLoading: false,
  searchTerm: "",
  selectedCategory: "",
  sortBy: "name",
  sortOrder: "asc",

  setProducts: (products) => set({ products }),
  setOrders: (orders) => set({ orders }),
  setCustomers: (customers) => set({ customers }),
  setCategories: (categories) => set({ categories }),
  setSuppliers: (suppliers) => set({ suppliers }),
  setLoading: (isLoading) => set({ isLoading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  updateOrder: (order) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === order.id ? order : o)),
    })),
  removeOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),

  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),
  updateCustomer: (customer) =>
    set((state) => ({
      customers: state.customers.map((c) => (c.id === customer.id ? customer : c)),
    })),
  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    })),
}))
