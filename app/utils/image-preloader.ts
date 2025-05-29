"use client"

/**
 * Preloads images to improve user experience
 * @param imagePaths Array of image paths to preload
 * @returns Promise that resolves when all images are loaded or rejected
 */
export function preloadImages(imagePaths: string[]): Promise<void> {
  const imagePromises = imagePaths.map((path) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.src = path
      img.onload = () => resolve()
      img.onerror = () => resolve() // Resolve even on error to continue
    })
  })

  return Promise.all(imagePromises).then(() => {})
}

/**
 * Preloads a batch of images with a delay between batches
 * to prevent overwhelming the browser
 * @param imagePaths Array of image paths to preload
 * @param batchSize Number of images to load in each batch
 * @param delayMs Delay between batches in milliseconds
 */
export function preloadImagesInBatches(imagePaths: string[], batchSize = 5, delayMs = 300): Promise<void> {
  return new Promise((resolve) => {
    const totalImages = imagePaths.length
    let loadedCount = 0

    const loadBatch = (startIndex: number) => {
      const batch = imagePaths.slice(startIndex, startIndex + batchSize)

      if (batch.length === 0) {
        resolve()
        return
      }

      preloadImages(batch).then(() => {
        loadedCount += batch.length

        if (loadedCount >= totalImages) {
          resolve()
        } else {
          setTimeout(() => {
            loadBatch(startIndex + batchSize)
          }, delayMs)
        }
      })
    }

    loadBatch(0)
  })
}
