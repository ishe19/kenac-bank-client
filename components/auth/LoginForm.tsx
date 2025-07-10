"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"

interface LoginFormProps {
  onSuccess: (token: string, user: any) => void
}

interface LoginFormData {
  email: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  message: string,
  success: boolean
  accessToken: string
  refreshToken: String
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [apiError, setApiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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
      const loginRequest: LoginRequest = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }
      
      const response = await fetch("http://localhost:5980/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        if (response.status === 401) {
          setApiError("Invalid email or password")
        } else if (response.status === 404) {
          setApiError("Account not found")
        } else {
          setApiError(errorData.message || `Login failed with status ${response.status}`)
        }
        return
      }

      console.log("Login response:", response)
      
      const data: LoginResponse = await response.json()
      console.log("Login successful:", data)
      
      // Store token in localStorage (or wherever you prefer)
      localStorage.setItem("accessToken", data.accessToken)
      
      onSuccess(data.accessToken, data.refreshToken)
    } catch (error) {
      console.error("Login error:", error)
      setApiError("Login failed. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (errors[name as keyof LoginFormData]) {
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

      {/* Email Field */}
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
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
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
            placeholder="Enter your password"
            disabled={isLoading}
            aria-describedby={errors.password ? "password-error" : undefined}
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
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </motion.button>
    </form>
  )
}