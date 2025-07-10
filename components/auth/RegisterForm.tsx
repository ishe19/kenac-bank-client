"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface RegisterFormProps {
  onSuccess: () => void
}

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const [apiError, setApiError] = useState("")

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const registerRequest: RegisterRequest = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }

      const response = await fetch("http://localhost:5980/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Registration failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log("Registration successful:", data)
      onSuccess()
    } catch (error) {
      console.error("Registration error:", error)
      setApiError(error instanceof Error ? error.message : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Error Message */}
      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
        >
          {apiError}
        </motion.div>
      )}

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className={`input-field ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter your first name"
          disabled={isLoading}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className={`input-field ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter your last name"
          disabled={isLoading}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Enter your email address"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`input-field pr-10 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Create a password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  )
}