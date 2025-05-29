import { getProducts } from "../actions/products"

// Force dynamic rendering since this page uses cookies via Supabase
export const dynamic = "force-dynamic"

export default async function TestImagesPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Image URL Test Page</h1>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Database Connection</h2>
        <p>Products loaded: {products.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 12).map((product) => (
          <div key={product.style} className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-medium">Style: {product.style}</h3>
              <p className="text-sm text-gray-500 truncate">{product.name}</p>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2 break-all">Image URL:</p>
              <div className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-20 mb-4">
                {product.image_url || "No image URL"}
              </div>

              <div className="aspect-square relative bg-gray-200 rounded overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error(`Error loading image for ${product.style}:`, product.image_url)
                      e.currentTarget.src = `/placeholder.svg?height=300&width=300&text=Style+${product.style}&bg=8B5CF6&textColor=white`
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
