"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CustomerInfoForm() {
  const [customerInfo, setCustomerInfo] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Please provide your business details to customize your price list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={customerInfo.businessName}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Your Business Name"
                />
              </div>
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={customerInfo.contactName}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, contactName: e.target.value }))}
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="123 Business St, City, State 12345"
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Any specific requirements or questions..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
