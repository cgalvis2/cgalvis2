"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import type { Customer } from "@/lib/types"
import { Plus, Search, Loader2, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"
import { CustomerForm } from "@/components/customer-form"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setCustomers(data || [])
    } catch (error) {
      console.error("Error fetching customers:", error)
      toast.error("Failed to load customers")
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your customer database</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Create a new customer profile</DialogDescription>
            </DialogHeader>
            <CustomerForm
              onSuccess={() => {
                setOpen(false)
                fetchCustomers()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>View and manage your customer base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-3">{customer.name}</h3>
                      <div className="space-y-2 text-sm">
                        {customer.email && (
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${customer.email}`} className="hover:underline truncate">
                              {customer.email}
                            </a>
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Phone className="h-4 w-4" />
                            <span>{customer.phone}</span>
                          </div>
                        )}
                        {customer.address && (
                          <div className="flex gap-2 text-slate-600 dark:text-slate-400">
                            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                            <span className="text-xs">{customer.address}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-slate-500">No customers found</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
