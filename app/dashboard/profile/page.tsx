"use client"

import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ProfileForm } from "@/components/profile/ProfileForm"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProfileForm />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
