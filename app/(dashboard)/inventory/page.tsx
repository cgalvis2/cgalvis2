const products = [
  { name: "Product 1", sku: "SKU1", category_id: "1", quantity: 10 },
  { name: "Product 2", sku: "SKU2", category_id: "2", quantity: 20 },
  { name: "Product 3", sku: "SKU3", category_id: "1", quantity: 5 },
]

const searchTerm = "product"
const selectedCategory = "1"
const sortBy = "name"

const InventoryPage = () => {
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        (product.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
        (product.sku?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || !selectedCategory || product.category_id === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name ?? "").localeCompare(b.name ?? "")
        case "sku":
          return (a.sku ?? "").localeCompare(b.sku ?? "")
        case "quantity":
          return b.quantity - a.quantity
        default:
          return 0
      }
    })

  return (
    <div>
      {filteredProducts.map((product) => (
        <div key={product.sku}>
          <h2>{product.name}</h2>
          <p>SKU: {product.sku}</p>
          <p>Category ID: {product.category_id}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default InventoryPage
