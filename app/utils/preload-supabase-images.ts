"use client"

import { preloadImagesInBatches } from "./image-preloader"
import type { Product } from "../actions/products"

/**
 * Preloads product images from Supabase
 * @param products Array of products with image_url property
 * @param batchSize Number of images to load in each batch
 * @param delayMs Delay between batches in milliseconds
 */
export async function preloadSupabaseImages(products: Product[], batchSize = 5, delayMs = 300): Promise<void> {
  // Extract valid image URLs from products
  const imageUrls = products
    .map((product) => product.image_url)
    .filter((url): url is string => !!url && typeof url === "string")

  if (imageUrls.length === 0) {
    return Promise.resolve()
  }

  return preloadImagesInBatches(imageUrls, batchSize, delayMs)
}
