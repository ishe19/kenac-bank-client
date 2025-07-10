"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    // Store auth token in localStorage/cookies
    localStorage.setItem("isAuthenticated", "true")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Welcome to Kenac Bank
          </motion.h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <LoginForm onSuccess={handleLoginSuccess} />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
