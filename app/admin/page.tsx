import { getProducts } from "../actions/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ProductImage } from "@/components/product-image"

export default async function AdminPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Link href="/">
          <Button variant="outline">Back to Catalog</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Style</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Control</th>
                  <th className="p-2 text-right">Retail Price</th>
                  <th className="p-2 text-right">65% Disc</th>
                  <th className="p-2 text-right">70% Disc</th>
                  <th className="p-2 text-right">73% Disc</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.style} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <ProductImage
                          src={product.image_url}
                          alt={product.name}
                          productName={product.name}
                          productStyle={product.style}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-2">{product.style}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product.control}</td>
                    <td className="p-2 text-right">${product.retail_price.toFixed(2)}</td>
                    <td className="p-2 text-right">${product.disc_65.toFixed(2)}</td>
                    <td className="p-2 text-right">${product.disc_70.toFixed(2)}</td>
                    <td className="p-2 text-right">${product.disc_73.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
