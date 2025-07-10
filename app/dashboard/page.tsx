"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { DepositModal } from "@/components/modals/DepositModal";
import { WithdrawModal } from "@/components/modals/WithdrawModal";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

interface Balance {
  currency: "USD" | "ZWG";
  amount: number;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: "USD" | "ZWG";
  date: string;
  description: string;
  status: "completed" | "pending" | "failed";
}

export default function DashboardPage() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const balanceResponse = await fetch("/api/client/balance");
      const balanceData = await balanceResponse.json();
      setBalances(balanceData.balances);

      const transactionResponse = await fetch("/api/client/transactions");
      const transactionData = await transactionResponse.json();
      setTransactions(transactionData.transactions);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionSuccess = () => {
    fetchDashboardData();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const totalBalance = balances.reduce((sum, b) => sum + b.amount, 0);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="flex flex-col flex-1 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">
              Here's what's happening with your accounts today.
            </p>
          </div>
          <div className="flex items-center space-x-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-xl font-bold text-gray-900">
                ${totalBalance.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-green-600">+$1,250</p>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {balances.map((balance, i) => (
                <motion.div
                  key={balance.currency}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BalanceCard balance={balance} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <QuickActions
                onDeposit={() => setIsDepositModalOpen(true)}
                onWithdraw={() => setIsWithdrawModalOpen(true)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
                <a
                  href="/dashboard/transactions"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </a>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* ... transaction row */}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <RecentActivity />
            </motion.div>

            {/* Insights & Tips as before */}
          </div>
        </div>
      </div>

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />
    </DashboardLayout>
  );
}
