"use server"

import { createClient } from "@/utils/supabase/server"

export interface Product {
  id: number
  style: string
  name: string
  sizes: string
  control: string
  retail_price: number
  disc_65: number
  disc_70: number
  disc_73: number
  category: string
  image_url: string
  features?: string[]
  created_at?: string
  updated_at?: string
}

// Fallback product data in case database is unavailable
const fallbackProducts: Product[] = [
  {
    id: 1,
    style: "100",
    name: "Renee Underbust Waist Cincher",
    sizes: "XS-6XL",
    control: "Extra-Firm",
    retail_price: 76.56,
    disc_65: 26.8,
    disc_70: 22.97,
    disc_73: 20.67,
    category: "Waist Training",
    image_url: "/images/products/100.png",
  },
  {
    id: 2,
    style: "100A",
    name: "Renee Underbust Full Back Waist Cincher",
    sizes: "XS-6XL",
    control: "Extra-Firm",
    retail_price: 79.2,
    disc_65: 27.72,
    disc_70: 23.76,
    disc_73: 21.38,
    category: "Waist Training",
    image_url: "/images/products/100A.png",
  },
  {
    id: 3,
    style: "103",
    name: "Valerie Extra Firm Waist Trainer",
    sizes: "XS-6XL",
    control: "Extra Firm",
    retail_price: 66.0,
    disc_65: 23.1,
    disc_70: 19.8,
    disc_73: 17.82,
    category: "Waist Training",
    image_url: "/images/products/103.png",
  },
  // Add more fallback products as needed
]

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient()

    // Test the connection first
    const { data, error, status } = await supabase.from("products").select("*").order("style").limit(100) // Add a limit to prevent large responses

    if (error) {
      console.error("Supabase query error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })

      // Return fallback data if there's an error
      return fallbackProducts
    }

    if (!data || data.length === 0) {
      console.log("No data returned from Supabase")
      return fallbackProducts
    }

    // Log a sample of the data to verify image_url is present
    console.log("Sample product from database:", data[0])

    // Ensure all products have an image_url (even if it's empty)
    const productsWithImages = data.map((product) => ({
      ...product,
      image_url: product.image_url || "",
    }))

    return productsWithImages
  } catch (error) {
    console.error("Unexpected error in getProducts:", error)
    // Return fallback data if there's an unexpected error
    return fallbackProducts
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("products").select("*").eq("category", category).order("style")

    if (error) {
      console.error("Error fetching products by category:", error)
      return fallbackProducts.filter((p) => p.category === category)
    }

    return data || []
  } catch (error) {
    console.error("Error in getProductsByCategory:", error)
    return fallbackProducts.filter((p) => p.category === category)
  }
}

export async function getProductByStyle(style: string): Promise<Product | null> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("products").select("*").eq("style", style).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null
      }
      console.error("Error fetching product by style:", error)
      return fallbackProducts.find((p) => p.style === style) || null
    }

    return data
  } catch (error) {
    console.error("Error in getProductByStyle:", error)
    return fallbackProducts.find((p) => p.style === style) || null
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("products").select("category").order("category")

    if (error) {
      console.error("Error fetching categories:", error)
      const uniqueCategories = [...new Set(fallbackProducts.map((p) => p.category))]
      return uniqueCategories
    }

    // Extract unique categories
    const categories = [...new Set(data.map((item) => item.category))]
    return categories.filter(Boolean)
  } catch (error) {
    console.error("Error in getCategories:", error)
    const uniqueCategories = [...new Set(fallbackProducts.map((p) => p.category))]
    return uniqueCategories
  }
}
