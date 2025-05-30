"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/app/contexts/language-context"

export function CustomerInfoForm() {
  const { t } = useLanguage()
  const [customerInfo, setCustomerInfo] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  return (
    <section id="customer-information" className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{t("customer.title")}</CardTitle>
            <CardDescription>{t("customer.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">{t("customer.businessName")}</Label>
                <Input
                  id="businessName"
                  value={customerInfo.businessName}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, businessName: e.target.value }))}
                  placeholder={t("customer.businessNamePlaceholder")}
                />
              </div>
              <div>
                <Label htmlFor="contactName">{t("customer.contactName")}</Label>
                <Input
                  id="contactName"
                  value={customerInfo.contactName}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, contactName: e.target.value }))}
                  placeholder={t("customer.contactNamePlaceholder")}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">{t("customer.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder={t("customer.emailPlaceholder")}
                />
              </div>
              <div>
                <Label htmlFor="phone">{t("customer.phone")}</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder={t("customer.phonePlaceholder")}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">{t("customer.address")}</Label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                placeholder={t("customer.addressPlaceholder")}
              />
            </div>
            <div>
              <Label htmlFor="notes">{t("customer.notes")}</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder={t("customer.notesPlaceholder")}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
