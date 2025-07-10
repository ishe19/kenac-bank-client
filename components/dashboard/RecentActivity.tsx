"use client"

import { motion } from "framer-motion"
import { ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "success",
      title: "Deposit Completed",
      description: "Your salary deposit of $2,500 has been processed",
      time: "2 hours ago",
      icon: CheckCircleIcon,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "pending",
      title: "Transfer Pending",
      description: "Transfer to savings account is being processed",
      time: "4 hours ago",
      icon: ClockIcon,
      color: "text-yellow-600",
    },
    {
      id: 3,
      type: "alert",
      title: "Low Balance Alert",
      description: "Your checking account balance is below $500",
      time: "1 day ago",
      icon: ExclamationTriangleIcon,
      color: "text-red-600",
    },
    {
      id: 4,
      type: "success",
      title: "Bill Payment",
      description: "Electricity bill payment of $125 completed",
      time: "2 days ago",
      icon: CheckCircleIcon,
      color: "text-green-600",
    },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-1 rounded-full ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
              <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
