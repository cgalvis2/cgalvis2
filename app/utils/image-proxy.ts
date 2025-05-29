"use client"

/**
 * Converts a Shopify CDN URL to a format that might avoid CORS issues
 * @param url The original Shopify CDN URL
 * @returns A modified URL that might work better with CORS
 */
export function getProxiedImageUrl(url: string): string {
  if (!url || typeof url !== "string") {
    return url
  }

  // Check if it's a blocked Shopify CDN URL (cdn.shopify.com)
  if (url.includes("cdn.shopify.com")) {
    console.log(`Blocked Shopify CDN URL detected: ${url}`)
    // These URLs are blocked by CORS, return null to trigger fallback
    return ""
  }

  // Check if it's a working Shopify URL (vedettestore.com/cdn/shop/files/)
  if (url.includes("vedettestore.com/cdn/shop/files/")) {
    console.log(`Working Shopify URL detected: ${url}`)
    // These URLs work, return as-is
    return url
  }

  // Return the original URL for non-Shopify URLs
  return url
}

/**
 * Checks if a URL is a Shopify CDN URL (either format)
 * @param url The URL to check
 * @returns True if the URL is a Shopify CDN URL, false otherwise
 */
export function isShopifyUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false
  }

  return url.includes("cdn.shopify.com") || url.includes("vedettestore.com/cdn/shop/files/")
}

/**
 * Checks if a URL is a blocked Shopify CDN URL
 * @param url The URL to check
 * @returns True if the URL is a blocked Shopify CDN URL, false otherwise
 */
export function isBlockedShopifyUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false
  }

  return url.includes("cdn.shopify.com")
}

/**
 * Gets a local fallback image for a product when external images fail
 * @param productStyle The product style number
 * @param imageUrl The original image URL that failed
 * @returns A fallback image URL
 */
export function getFallbackImageUrl(productStyle: string, imageUrl?: string): string {
  // Log the failure for debugging
  if (imageUrl) {
    console.log(`Using fallback for image: ${imageUrl} (Style: ${productStyle})`)
  }

  // Return a placeholder SVG with the style number
  return `/placeholder.svg?height=300&width=300&text=Style+${productStyle}&bg=8B5CF6&textColor=white`
}
