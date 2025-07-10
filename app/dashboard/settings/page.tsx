"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/DashboardLayout"

type SettingsState = {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactor: boolean;
    loginAlerts: boolean;
  };
  preferences: {
    currency: string;
    language: string;
    theme: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
    },
    preferences: {
      currency: "USD",
      language: "en",
      theme: "light",
    },
  })

  const handleToggle = (category: keyof SettingsState, setting: string) => {
    setSettings(prev => {
      const categorySettings = prev[category];
      
      // Type-safe check for boolean properties
      if (category === 'notifications' || category === 'security') {
        return {
          ...prev,
          [category]: {
            ...categorySettings,
            [setting]: !(categorySettings as any)[setting]
          }
        };
      }
      
      return prev;
    });
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-4xl"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 capitalize">{key} Notifications</p>
                  <p className="text-sm text-gray-600">Receive notifications via {key}</p>
                </div>
                <button
                  onClick={() => handleToggle("notifications", key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
          <div className="space-y-4">
            {Object.entries(settings.security).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {key === "twoFactor" ? "Two-Factor Authentication" : "Login Alerts"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === "twoFactor"
                      ? "Add an extra layer of security to your account"
                      : "Get notified of new login attempts"}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("security", key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <select
                value={settings.preferences.currency}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    preferences: { ...prev.preferences, currency: e.target.value },
                  }))
                }
                className="input-field"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="ZWG">ZWG - Zimbabwean Gold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.preferences.language}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    preferences: { ...prev.preferences, language: e.target.value },
                  }))
                }
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <button className="btn-primary">Save Changes</button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}