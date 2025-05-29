import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Force dynamic rendering since this page uses cookies via Supabase
export const dynamic = "force-dynamic"

export default async function DbCheckPage() {
  const supabase = createClient()

  // Query a few products to check their image_url values
  const { data: products, error } = await supabase
    .from("products")
    .select("style, name, image_url")
    .order("style")
    .limit(20)

  // Check if any products have image URLs
  const productsWithImages = products?.filter((p) => p.image_url && p.image_url.trim() !== "") || []
  const productsWithoutImages = products?.filter((p) => !p.image_url || p.image_url.trim() === "") || []

  // Check if any image URLs are Shopify CDN URLs
  const shopifyUrls = productsWithImages.filter((p) => p.image_url.includes("cdn.shopify.com"))

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Database Image URL Check</h1>

      <div className="grid gap-6">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Database Connection</h2>
          {error ? (
            <div className="text-red-600">Error: {error.message}</div>
          ) : (
            <div className="text-green-600">Connected successfully</div>
          )}
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Image URL Statistics</h2>
          <ul className="space-y-2">
            <li>
              Total products checked: <strong>{products?.length || 0}</strong>
            </li>
            <li>
              Products with image URLs: <strong>{productsWithImages.length}</strong>
            </li>
            <li>
              Products without image URLs: <strong>{productsWithoutImages.length}</strong>
            </li>
            <li>
              Products with Shopify CDN URLs: <strong>{shopifyUrls.length}</strong>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sample Image URLs</h2>
          <div className="space-y-4">
            {shopifyUrls.slice(0, 5).map((product) => (
              <div key={product.style} className="border p-3 rounded bg-white">
                <div className="font-medium">
                  Style: {product.style} - {product.name}
                </div>
                <div className="text-sm text-gray-500 break-all mt-1">{product.image_url}</div>
                <div className="mt-2">
                  <a
                    href={product.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/image-debug">
            <Button>Go to Image Debug Tool</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Catalog</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
