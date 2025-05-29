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

  // Check if it's a Shopify CDN URL
  if (url.includes("cdn.shopify.com")) {
    try {
      // Try to use the URL constructor to parse the URL
      const parsedUrl = new URL(url)

      // Add a cache-busting query parameter
      parsedUrl.searchParams.append("_cb", Date.now().toString())

      // Return the modified URL
      return parsedUrl.toString()
    } catch (error) {
      console.error("Error parsing Shopify URL:", error)
      return url
    }
  }

  // Return the original URL for non-Shopify URLs
  return url
}

/**
 * Checks if a URL is a Shopify CDN URL
 * @param url The URL to check
 * @returns True if the URL is a Shopify CDN URL, false otherwise
 */
export function isShopifyUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false
  }

  return url.includes("cdn.shopify.com")
}
