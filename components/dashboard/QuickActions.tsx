"use client"

import { motion } from "framer-motion"
import {
  PlusIcon,
  MinusIcon,
  ArrowsRightLeftIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"

interface QuickActionsProps {
  onDeposit: () => void
  onWithdraw: () => void
}

export function QuickActions({ onDeposit, onWithdraw }: QuickActionsProps) {
  const actions = [
    {
      name: "Deposit",
      description: "Add money to your account",
      icon: PlusIcon,
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      onClick: onDeposit,
    },
    {
      name: "Withdraw",
      description: "Take money from your account",
      icon: MinusIcon,
      color: "bg-red-50 text-red-600 hover:bg-red-100",
      onClick: onWithdraw,
    },
    {
      name: "Transfer",
      description: "Move money between accounts",
      icon: ArrowsRightLeftIcon,
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      onClick: () => alert("Transfer feature coming soon!"),
    },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className={`p-4 rounded-xl transition-all duration-200 text-left ${action.color}`}
          >
            <action.icon className="h-6 w-6 mb-2" />
            <p className="font-medium text-gray-900">{action.name}</p>
            <p className="text-xs text-gray-600 mt-1">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
