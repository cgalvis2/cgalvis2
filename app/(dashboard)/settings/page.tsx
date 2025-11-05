"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Lock, Database, Zap } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your application preferences</p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the app looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Mode</Label>
              <p className="text-sm text-slate-500 mt-1">Switch between light and dark theme</p>
            </div>
            <ModeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Low Stock Alerts</Label>
              <p className="text-sm text-slate-500 mt-1">Get notified when inventory is low</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Order Updates</Label>
              <p className="text-sm text-slate-500 mt-1">Notifications for new orders</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Customer Notifications</Label>
              <p className="text-sm text-slate-500 mt-1">Notifications for new customers</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Data Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full bg-transparent">
            Export Data (CSV)
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Backup Database
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Manage security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="password">Change Password</Label>
            <div className="flex gap-2 mt-2">
              <Input type="password" placeholder="New password" id="password" />
              <Button>Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">App Version:</span> 1.0.0
            </p>
            <p className="text-sm">
              <span className="font-medium">Built with:</span> Next.js, React, Tailwind CSS
            </p>
            <p className="text-sm text-slate-500">
              Inventory Management System - Complete solution for managing your warehouse
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
