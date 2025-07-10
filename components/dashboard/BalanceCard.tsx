"use client"

import { motion } from "framer-motion"

interface Balance {
  currency: "USD" | "ZWG"
  amount: number
}

interface BalanceCardProps {
  balance: Balance
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "ZWG" ? "USD" : currency, // Fallback for ZWG
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getCurrencySymbol = (currency: string) => {
    return currency === "ZWG" ? "ZWG" : "$"
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="card hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{balance.currency} Balance</p>
          <p className="text-3xl font-bold text-gray-900">
            {getCurrencySymbol(balance.currency)}
            {balance.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div
          className={`p-3 rounded-full ${
            balance.currency === "USD" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          <div className="w-6 h-6 font-bold text-lg">{getCurrencySymbol(balance.currency)}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <div className="flex-1">
            <span>Available Balance</span>
          </div>
          <span className="font-medium">
            {getCurrencySymbol(balance.currency)}
            {balance.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
