"use client"

/**
 * Checks if an image URL is valid by attempting to load it
 * @param url The image URL to validate
 * @returns Promise that resolves to true if the image is valid, false otherwise
 */
export function isImageUrlValid(url: string): Promise<boolean> {
  if (!url || url.trim() === "") {
    return Promise.resolve(false)
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * Validates multiple image URLs in parallel
 * @param urls Array of image URLs to validate
 * @returns Promise that resolves to an object mapping URLs to their validity
 */
export async function validateImageUrls(urls: string[]): Promise<Record<string, boolean>> {
  const validationPromises = urls.map(async (url) => {
    const isValid = await isImageUrlValid(url)
    return { url, isValid }
  })

  const results = await Promise.all(validationPromises)

  return results.reduce(
    (acc, { url, isValid }) => {
      acc[url] = isValid
      return acc
    },
    {} as Record<string, boolean>,
  )
}
