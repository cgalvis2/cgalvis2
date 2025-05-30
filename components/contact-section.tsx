"use client"

import { Phone, Mail, MessageCircle, MapPin, Truck, CreditCard } from "lucide-react"
import { useLanguage } from "@/app/contexts/language-context"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t("contact.title")}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">{t("contact.address")}</p>
                  <p className="text-gray-300">501 Lakeside Drive, Williamson, GA 30292</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">{t("contact.phone")}</p>
                  <p className="text-gray-300">(770) 412-9385</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">{t("contact.whatsapp")}</p>
                  <p className="text-gray-300">(470) 332-6026</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-semibold">{t("contact.email")}</p>
                  <p className="text-gray-300">orders.usa@vedettecorp.com</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">{t("contact.paymentShipping")}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-semibold">{t("contact.acceptedPayments")}</p>
                  <p className="text-gray-300">{t("contact.acceptedPaymentsDesc")}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-semibold">{t("contact.shipping")}</p>
                  <p className="text-gray-300">{t("contact.shippingDesc1")}</p>
                  <p className="text-gray-300">{t("contact.shippingDesc2")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">{t("contact.copyright")}</p>
        </div>
      </div>
    </section>
  )
}
