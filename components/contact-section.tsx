import { Phone, Mail, MessageCircle, MapPin, Truck, CreditCard } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-300">501 Lakeside Drive, Williamson, GA 30292</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-300">(770) 412-9385</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-gray-300">(470) 332-6026</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-300">orders.usa@vedettecorp.com</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Payment & Shipping</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-semibold">Accepted Payments</p>
                  <p className="text-gray-300">Visa, Mastercard, American Express, Discover, Money Orders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-semibold">Shipping</p>
                  <p className="text-gray-300">Same day shipping if received before 12PM EST</p>
                  <p className="text-gray-300">Delivery: 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © 2025 Orion Manufacturing Inc. All rights reserved. Vedette™ is a registered trademark.
          </p>
        </div>
      </div>
    </section>
  )
}
