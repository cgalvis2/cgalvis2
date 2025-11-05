"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface CustomerFormProps {
  onSuccess?: () => void
}

export function CustomerForm({ onSuccess }: CustomerFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields")
      return
    }

    try {
      setLoading(true)

      const { error } = await supabase.from("customers").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      ])

      if (error) throw error

      toast.success("Customer added successfully")
      setFormData({ name: "", email: "", phone: "", address: "" })
      onSuccess?.()
    } catch (error) {
      console.error("Error adding customer:", error)
      toast.error("Failed to add customer")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Customer name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="customer@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1-555-0000"
          value={formData.phone}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <textarea
          id="address"
          name="address"
          placeholder="Customer address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-input rounded-md text-sm mt-2"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Adding..." : "Add Customer"}
      </Button>
    </form>
  )
}
