import { Star, Shield, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Premium Shapewear for Your Business</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover our comprehensive collection of high-quality shapewear with competitive wholesale pricing. Build your
          inventory with trusted products that deliver exceptional results for your customers.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">Premium Quality</span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="font-semibold">Trusted Brand</span>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <Truck className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Fast Shipping</span>
          </div>
        </div>
      </div>
    </section>
  )
}
