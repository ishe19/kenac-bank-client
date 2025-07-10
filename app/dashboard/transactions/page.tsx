"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { TransactionTable } from "@/components/dashboard/TransactionTable"

interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  currency: "USD" | "ZWG"
  date: string
  description: string
  status: "completed" | "pending" | "failed"
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/client/transactions")
      const data = await response.json()
      setTransactions(data.transactions)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
            <p className="text-gray-600">View and manage all your transactions</p>
          </div>

          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-primary">Download Statement</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-6 h-6 text-green-600 font-bold">+</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                <p className="text-2xl font-bold text-gray-900">$3,500.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-6 h-6 text-red-600 font-bold">-</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Withdrawals</p>
                <p className="text-2xl font-bold text-gray-900">$325.50</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="w-6 h-6 text-blue-600 font-bold">#</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transaction Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <TransactionTable transactions={transactions} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
