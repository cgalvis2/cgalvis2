import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WholesaleTerms() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Wholesale Terms & Benefits</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-600">65% Discount</CardTitle>
              <CardDescription>Minimum Order: $400 USD</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Perfect for small retailers and boutiques starting their shapewear collection.
              </p>
            </CardContent>
          </Card>
          <Card className="border-pink-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-pink-600">70% Discount</CardTitle>
              <CardDescription>Minimum Order: $2,000 USD</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ideal for established retailers looking to expand their inventory with better margins.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-purple-600">73% Discount</CardTitle>
              <CardDescription>Premium Wholesale Tier</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Maximum savings for high-volume retailers and distributors.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
