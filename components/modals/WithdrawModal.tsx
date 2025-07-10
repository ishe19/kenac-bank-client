"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function WithdrawModal({ isOpen, onClose, onSuccess }: WithdrawModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD" as "USD" | "ZWG",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.amount) {
      newErrors.amount = "Amount is required"
    } else if (Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    } else if (Number.parseFloat(formData.amount) > 5000) {
      newErrors.amount = "Amount cannot exceed $5,000 per transaction"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/client/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number.parseFloat(formData.amount),
          currency: formData.currency,
          description: formData.description || "Withdrawal",
        }),
      })

      if (response.ok) {
        onSuccess()
        onClose()
        setFormData({ amount: "", currency: "USD", description: "" })
        setErrors({})
      } else {
        const data = await response.json()
        setErrors({ general: data.message || "Withdrawal failed" })
      }
    } catch (error) {
      setErrors({ general: "Withdrawal failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
      setFormData({ amount: "", currency: "USD", description: "" })
      setErrors({})
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Make a Withdrawal</h2>
                  <button
                    onClick={handleClose}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                    >
                      {errors.general}
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      id="currency"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value as "USD" | "ZWG" })}
                      className="input-field"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="ZWG">ZWG - Zimbabwean Gold</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {formData.currency === "ZWG" ? "ZWG" : "$"}
                      </span>
                      <input
                        type="number"
                        id="amount"
                        step="0.01"
                        min="0"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className={`input-field pl-12 ${errors.amount ? "border-red-300 focus:ring-red-500" : ""}`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input-field"
                      placeholder="Enter a description"
                    />
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Please ensure you have sufficient funds before proceeding with the withdrawal.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4">
                    <button type="button" onClick={handleClose} disabled={isLoading} className="flex-1 btn-secondary">
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : "Withdraw"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
