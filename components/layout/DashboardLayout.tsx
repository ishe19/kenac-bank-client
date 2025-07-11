"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CreditCardIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState({ name: "Demo User", email: "demo@kenacbank.com" })
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/auth/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, description: "Account overview" },
    { name: "Transactions", href: "/dashboard/transactions", icon: CreditCardIcon, description: "Transaction history" },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon, description: "Account settings" },
    { name: "Settings", href: "/dashboard/settings", icon: CogIcon, description: "App preferences" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Fixed positioning for mobile, static for desktop */}
      <div className={`${isMobileMenuOpen ? 'fixed' : 'hidden'} lg:flex lg:flex-shrink-0 inset-y-0 left-0 z-50 w-72`}>
        <div className="flex flex-col w-full bg-white shadow-xl border-r border-gray-200">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Kenac Bank</h1>
                <p className="text-xs text-blue-100">Digital Banking</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-white hover:text-blue-200 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="mb-4">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h3>
            </div>

            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`flex-shrink-0 h-5 w-5 mr-3 transition-colors ${
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {isActive && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-red-600 transition-colors" />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200 backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile menu button and breadcrumb */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Kenac Bank</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium capitalize">{pathname.split("/").pop() || "Dashboard"}</span>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* Date Display */}
              <div className="hidden sm:block text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}